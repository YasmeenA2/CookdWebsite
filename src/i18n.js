import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "fr",
    resources: {
      en: {
        translation: {
          greeting: "Explore a world of flavors with our recipes",
          apology: "We apologize, recipe not found",
          home: "Home",
          favorites: "Favorites",
          contactUs: "Contact Us",
          category: {
            breakfast: "Breakfast",
            lunch: "Lunch",
            dessert: "Dessert",
          },
          popularPicks: "Popular Picks",
          vegetarianPicks: "Vegetarian Picks",
          lowCarbPicks: "Low Carb Picks", 
          glutenFreePicks: "Gluten Free Picks",
          instructions: "Instructions",
          ingredients: "Ingredients",
          video: "Video",
          views: "Views",
          rating: "Rating",
          yourFavoriteRecipes: "Your Favorite Recipes",
          noFavoritesMessage: "There are no recipes favorited.",
          removeFromFavorites: "Remove {{title}} from favorites",
          contactUs: "Contact Us",
          name: "Name",
          email: "Email",
          questionLabel: "Question/ Features you'd like us to add?",
          submit: "Submit",
          nameError: "Please fill this field with alphabets only",
          emptyFieldsError: "Please fill in all fields",
          popupMessage: "Thank you for contacting us, we will get back to you as soon as possible! 😄",
          Back: "Back"

         
        },
      },
      fr: {
        translation: {
          greeting: "Explorez un monde de saveurs avec nos recettes",
          apology: "Nous nous excusons, recette introuvable",
          home: "Accueil",
          favorites: "Favoris",
          contactUs: "Contactez-nous",
          category: {
            breakfast: "Petit-déjeuner",
            lunch: "Déjeuner",
            dessert: "Dessert",
          },
          popularPicks: "Choix Populaires",
          vegetarianPicks: "Choix Végétariens",
          lowCarbPicks: "Choix Faibles en Glucides", 
          glutenFreePicks: "Choix Sans Gluten",
          instructions: "Instructions",
          ingredients: "Ingrédients",
          video: "Vidéo",
          views: "Vues",
          rating: "Évaluation",
          yourFavoriteRecipes: "Vos Recettes Favoris",
          noFavoritesMessage: "Aucune recette favoris.",
          removeFromFavorites: "Retirer {{title}} des favoris",
          contactUs: "Contactez-nous",
          name: "Nom",
          email: "Email",
          questionLabel: "Question/ Fonctionnalités que vous aimeriez que nous ajoutions?",
          submit: "Envoyer",
          nameError: "Veuillez remplir ce champ avec des alphabets uniquement",
          emptyFieldsError: "Veuillez remplir tous les champs",
          popupMessage: "Merci de nous avoir contactés, nous vous répondrons dès que possible ! 😄",
          Back: "retourner"


         
        },
      },
    },
  });

export default i18n;
