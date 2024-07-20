import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const ContactUs = () => {
  const { t } = useTranslation(); // Use useTranslation hook to access translations
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [nameError, setNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Allow only alphabets
      if (/^[a-zA-Z]*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
        setNameError(""); // Clear error message when the user starts typing valid input
      } else {
        setNameError(t("nameError")); // Translate error message
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrorMessage(""); // Clear error message when the user starts typing valid input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (!formData.name || !formData.email || !formData.question) {
      setErrorMessage(t("emptyFieldsError")); // Translate error message
      return;
    }

    // Handle form submission logic here
    console.log(formData);
    setShowPopup(true); // Show the popup
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  return (
    <FormWrapper>
      <h2>{t("contactUs")}</h2> {/* Translate heading */}
      <form onSubmit={handleSubmit}>
        <LabelWrapper>
          <label htmlFor="name">{t("name")}</label> {/* Translate label */}
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </LabelWrapper>
        <label htmlFor="email">{t("email")}</label> {/* Translate label */}
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="question">{t("questionLabel")}</label> {/* Translate label */}
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
        ></textarea>
        <button type="submit">{t("submit")}</button> {/* Translate button text */}
      </form>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {showPopup && (
        <Popup>
          {t("popupMessage")} {/* Translate popup message */}
        </Popup>
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  max-width: 700px;
  margin: 10rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 26px;
  background-color: #fff;
  box-shadow: 5px 15px 38px -30px #181818;
  min-height: 600px;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-style: italic;
    font-family: 'Arial', cursive; 
    font-size: 31px;
    line-height: 37px;
    color: #191919;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 13px;
    color: black;
  }

  input,
  textarea {
    width: calc(100% - 18px);
    padding: 7px 9px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: black;
    outline: none;
  }

  textarea {
    height: 200px; /* Adjust this value to increase the height */
  }

  button {
    display: inline-block;
    width: 100%;
    padding: 10px 22px;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    position: relative;
    z-index: 3;
    transition: color 0.3s ease;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      bottom: 50%;
      left: 0;
      right: 0;
      background-color: orange; /* Changed the background color to orange */
      border-radius: 20px;
      z-index: -1;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #000;

      &::after {
        top: 0;
        bottom: 0;
        background: linear-gradient(to right, #f27121, #e94057);
      }
    }
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 0.5rem;
`;

const FormErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const Popup = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  padding: 5rem 2rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 15px 38px -30px #181818;
  text-align: center;
  font-size: 16px;
  color: #191919;
  z-index: 1000;
  min-height: 150px;
`;

export default ContactUs;
