import React from "react";
import {
  Navigate,
  Route,
  Routes,
  // useLocation,
  //   useNavigate,
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import PopupMenu from "../PopupMenu/PopupMenu";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import api from "../../utils/MoviesApi";
// import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "sasa" });
  const [popupMenuState, setPopupMenuState] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  // const location = useLocation();
  // const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.resolve(api.getCardsData())
        .then((cardsData) => {
          localStorage.setItem("cards", JSON.stringify(cardsData));
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn]);

  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root__container">
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route
              path="/"
              element={
                <>
                  <Header
                    loggedIn={isLoggedIn}
                    mode="bluemode"
                    onClick={handleMenuClick}
                  />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Header loggedIn={isLoggedIn} onClick={handleMenuClick} />
                  <Movies />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Header loggedIn={isLoggedIn} onClick={handleMenuClick} />
                  <SavedMovies />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={isLoggedIn}>
                  <Header loggedIn={isLoggedIn} onClick={handleMenuClick} />
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          <PopupMenu isOpen={popupMenuState} onClose={closePopup} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
