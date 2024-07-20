import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiCoffeeCup, GiSandwich, GiCupcake } from "react-icons/gi";
import { useTranslation } from 'react-i18next';


const Category = () => {
  const { t } = useTranslation(); 

  return (
    <List>
      <SLink to={"/cuisine/Breakfast"}>
        <h4>{t("category.breakfast")}</h4>
        <GiCoffeeCup />
      </SLink>
      <SLink to={"/cuisine/Lunch"}>
        <h4>{t("category.lunch")}</h4>
        <GiSandwich />
      </SLink>
      <SLink to={"/cuisine/Dessert"}>
        <h4>{t("category.dessert")}</h4>
        <GiCupcake />
      </SLink>
    </List>
  );
};


const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 10rem; /* Adjust width as needed */
  height: 5rem; /* Adjust height as needed */
  margin-right: 2rem;
  cursor: pointer;
  transform: scale(0.8);
  padding: 1rem; /* Add padding for better text and icon alignment */
  border-radius: 0.5rem; /* Adjust border-radius for rounded corners */

  h4 {
    color: white;
    font-size: 0.8rem;
    margin-top: 0.5rem; /* Adjust spacing between text and icon */
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }
`;

export default Category;
