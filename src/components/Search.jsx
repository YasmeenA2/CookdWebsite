import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next"


const Search = () => {

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {t} = useTranslation()


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the function to check if the recipe exists
    const recipeExists = await checkIfRecipeExists(input);

    if (recipeExists) {
      setErrorMessage("");
      navigate(`/recipe/${input}`);
    } else {
      setErrorMessage(t("apology"));
    }
  };

  const checkIfRecipeExists = async (recipeName) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data.results && data.results.length > 0;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return false;
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <FormStyle onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="searchInput">{t("greeting")}</Label>
          <FaSearch />
          <input
            onChange={handleChange}
            type="text"
            value={input}
          />
        </div>
      </FormStyle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

const Label = styled.label`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  display: block;
  text-align: center;
  font-style: italic;
  font-family: 'Arial', cursive;
`;

const FormStyle = styled.form`
  margin: 10rem 10rem 2rem;
  display: flex;
  justify-content: center;
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 70%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: black;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
`;

export default Search;
