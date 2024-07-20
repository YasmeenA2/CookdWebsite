import React, { useContext } from "react";
import styled from "styled-components";
import { FavoritesContext } from "../FavoritesContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Favorites = () => {
  const { t } = useTranslation(); // Use useTranslation hook to access translations
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <FavoritesContainer>
      {favorites.length > 0 && (
        <FavoritesHeading>{t("yourFavoriteRecipes")}</FavoritesHeading> // Translate heading
      )}

      <FavoritesGrid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {favorites.length === 0 ? (
          <NoFavorites aria-live="polite">
            <p>{t("noFavoritesMessage")}</p> {/* Translate message */}
          </NoFavorites>
        ) : (
          favorites.map((recipe) => (
            <FavoriteCard key={recipe.id}>
              <Link to={`/recipeDetails/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
              </Link>
              <FavoriteButton
                onClick={() => removeFavorite(recipe.id)}
                aria-label={t("removeFromFavorites", { title: recipe.title })} // Translate aria-label
              >
                <FiHeart />
              </FavoriteButton>
            </FavoriteCard>
          ))
        )}
      </FavoritesGrid>
    </FavoritesContainer>
  );
};

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* Adjust padding for content within the container */
`;

const FavoritesHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: 8rem;
  font-style: italic;
  font-family: "Arial", cursive;
  font-size: 31px;
  line-height: 37px;
  color: #191919;
`;

const FavoritesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  margin-top: 2rem; /* Adjust the top margin for spacing */
`;

const FavoriteCard = styled.div`
  width: 100%;
  max-width: 20rem; /* Limit the max width of each card */
  position: relative;
  img {
    width: 100%;
    height: auto;
    border-radius: 2rem;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const NoFavorites = styled.div`
  text-align: center;
  padding: 2rem;
  margin-top: 8rem;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgb(236, 110, 56);
  font-size: 1.5rem;
  cursor: pointer;
`;

export default Favorites;
