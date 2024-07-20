import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation(); 

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); 
    };

    return (
        <SelectorWrapper>
            <ButtonContainer>
                {languages.map((lng) => (
                    <LanguageButton 
                        className={lng.code === i18n.language ? "selected" : ""} 
                        key={lng.code} 
                        onClick={() => changeLanguage(lng.code)}
                    >
                        {lng.lang}
                    </LanguageButton>
                ))}
            </ButtonContainer>
        </SelectorWrapper>
    );
};

const SelectorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem; // Adjust space between buttons
`;

const LanguageButton = styled.button`
    background-color: rgb(236, 110, 56); // Button background color
    color: white; // Text color
    border: none;
    border-radius: 0.25rem; // Slightly smaller rounded corners
    padding: 0.25rem 0.5rem; // Reduced padding for smaller button
    font-size: 0.875rem; // Slightly smaller font size
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.selected { // Style for the selected button
        background-color: rgb(200, 90, 40); // Change the background color for the selected button
    }

    &:hover {
        background-color: rgb(200, 90, 40); // Darker shade on hover
    }
`;

export default LanguageSelector;
