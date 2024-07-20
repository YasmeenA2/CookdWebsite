import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { FavoritesContext } from "../FavoritesContext";
import Favorites from "./Favorites";
import { useTranslation } from "react-i18next";

const RecipeDetails = () => {
  const { t } = useTranslation();
  let params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const [isFavorite, setIsFavorite] = useState(false);
  const [videosFetched, setVideosFetched] = useState(false);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);

  useEffect(() => {
    setIsFavorite(favorites.some((recipe) => recipe.id === details.id));
  }, [details.id, favorites]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addFavorite(details);
    } else {
      removeFavorite(details.id);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailsData = await data.json();
      setDetails(detailsData);
      console.log("Recipe details:", detailsData);

      if (activeTab === "video" && detailsData.title) {
        fetchVideos(detailsData.title);
      }
    };
    fetchDetails();
  }, [params.name, activeTab]);

  const fetchVideos = async (recipeName) => {
    try {
      const fetchedVideos = await getRecipeVideos(recipeName);
      console.log("Fetched videos:", fetchedVideos);
      setVideos(fetchedVideos);
      setVideosFetched(true);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getRecipeVideos = async (recipeName, number = 2) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/food/videos/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipeName}&number=${number}`
      );
      const data = await api.json();
      console.log("API response:", data);
      return data.videos;
    } catch (error) {
      console.error("Error fetching recipe videos:", error);
      throw error;
    }
  };

  return (
    <DetailWrapper>
      <div style={{ flex: 1 }}>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          role="tab"
          aria-selected={activeTab === "instructions"}
          aria-controls="instructions-panel"
          id="instructions-tab"
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          {t("instructions")}
        </Button>
        <Button
          role="tab"
          aria-selected={activeTab === "ingredients"}
          aria-controls="ingredients-panel"
          id="ingredients-tab"
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
         {t("ingredients")}
        </Button>
        <Button
          role="tab"
          aria-selected={activeTab === "video"}
          aria-controls="video-panel"
          id="video-tab"
          className={activeTab === "video" ? "active" : ""}
          onClick={() => setActiveTab("video")}
        >
           {t("video")} 
        </Button>
        <HeartButton
          aria-label={isFavorite ? "Recipe added to favorites tab" : "Recipe removed from favorites tab"}
          onClick={handleFavoriteClick}
          favorite={isFavorite}
        >
          <FiHeart />
        </HeartButton>

        {activeTab === "instructions" && (
          <div
            id="instructions-panel"
            role="tabpanel"
            aria-labelledby="instructions-tab"
            style={{ marginTop: 30 }}
          >
            <ol dangerouslySetInnerHTML={{ __html: details.instructions }}></ol>
          </div>
        )}
        {activeTab === "ingredients" && (
          <div
            id="ingredients-panel"
            role="tabpanel"
            aria-labelledby="ingredients-tab"
            style={{ marginTop: 30 }}
          >
            <ol>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ol>
          </div>
        )}
        {activeTab === "video" && (
          <div
            id="video-panel"
            role="tabpanel"
            aria-labelledby="video-tab"
            style={{ marginTop: 30 }}
          >
            <VideoWrapper>
              {videos.map((video) => (
                <Video key={video.youTubeId}>
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.youTubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <h3>{video.title}</h3>
                  <p>{t("views")}: {video.views}</p>
                  <p>{t("rating")}: {video.rating}</p>
                </Video>
              ))}
            </VideoWrapper>
          </div>
        )}
         <BackButton onClick={() => navigate(-1)}>{t("Back")}</BackButton>
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 5rem;
  .active {
    background: rgb(236, 110, 56);
    color: white;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: rgb(236, 110, 56);
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  flex: 1;
`;

const HeartButton = styled(Button)`
  background: ${(props) => (props.favorite ? "rgb(236, 110, 56)" : "white")};
  color: ${(props) => (props.favorite ? "white" : "#313131")};
`;

const VideoWrapper = styled.div`
  margin-top: 2rem;
`;

const Video = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin-top: 1rem;
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    color: #313131;
  }
`;
const BackButton = styled.button`
  margin-top: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  
  padding: 1rem 2rem;
  color: white;
  background: rgb(236, 110, 56);
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;


export default RecipeDetails;
