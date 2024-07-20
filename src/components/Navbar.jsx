import React from 'react';
import styled from 'styled-components';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import LanguageSelector from './language-selector.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation(); 

  return (
    <Nav role="navigation" aria-label="Main Navigation">
      <GiKnifeFork aria-hidden="true" />
      <Logo to={"/Home"} aria-label="Cookd Home Page">
        COOKD
      </Logo>
      <GiKnifeFork aria-hidden="true" />
      <NavLinks role="menu">
        <NavLink exact to={"/Home"} activeClassName="active" aria-current="page" role="menuitem">
          {t("home")}
        </NavLink>
        <NavLink to="/favorites" activeClassName="active" role="menuitem">
          {t("favorites")}
        </NavLink>
        <NavLink to="/contact-us" activeClassName="active" role="menuitem">
          {t("contactUs")}
        </NavLink>
        <LanguageSelector />
      </NavLinks>
    </Nav>
  );
};

const Logo = styled(ReactRouterNavLink)`
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 400;
`;

const Nav = styled.div`
  padding: 1rem 2rem; // Adjust padding as necessary
  display: flex;
  justify-content: flex-start; // Aligns items to the start horizontally
  align-items: center; // Aligns items to the center vertically
  position: absolute; // Ensures the navbar stays at the top
  top: 0; // Aligns the navbar to the top of the page
  left: 0; // Aligns the navbar to the left of the page
  width: 100%; // Makes sure the navbar spans the full width of the page
  svg {
    font-size: 2rem;
  }
  border-bottom: 1px solid #e0e0e0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem; // Adjust space between links and buttons
  align-items: center; // Ensure vertical alignment
  margin-left: auto;
`;

const NavLink = styled(ReactRouterNavLink)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: black; // Default color
  &.active {
    color: rgb(236, 110, 56); // Color when link is active
  }
`;

export default Navbar;
