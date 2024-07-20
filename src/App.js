import "./app.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Cuisines from "./pages/Cuisines";
import Category from "./components/Category";
import Search from "./components/Search";
import SingleRecipe from "./pages/SingleRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import Favorites from "./pages/Favorites";
import ContactUs from "./pages/ContactUs";
import FavoritesProvider from "./FavoritesContext";
import "./i18n.js";
import LanguageSelector from "./components/language-selector.jsx";




const SimpleLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);


function App() {
  const location = useLocation();
  const hideSearchAndCategory= location.pathname === "/contact-us"|| location.pathname === "/favorites"; // Check if the current route is the contact page or fav page

  return (
    <FavoritesProvider>
    <Navbar />
      {!hideSearchAndCategory && <Search />}
      {!hideSearchAndCategory && <Category />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
         
          <Route path="/" element={<Home />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisines />}></Route>
          <Route path="/recipe/:search" element={<SingleRecipe />}></Route>
          <Route
            path="/recipeDetails/:name"
            element={<RecipeDetails />}
          ></Route>
           <Route path="/favorites" element={<Favorites />} /> {/* Add route for favorites */}
           <Route path="/contact-us" element={<SimpleLayout><ContactUs /></SimpleLayout>} />
       
        </Routes>
      </AnimatePresence>

    </FavoritesProvider>
  );
}

export default App;