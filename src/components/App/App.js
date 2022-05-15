import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
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
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [popupMenuState, setPopupMenuState] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTockenCheck(location.pathname);
  }, []);

  const handleTockenCheck = (path) => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getToken(jwt).then((res) => {
        if (res) {
          handleLogin(res);
          navigate(path);
        }
      });
    }
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  function handleUpdateUser(userData) {
    setCurrentUser(userData);
  }

  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  function handleCardSave(card) {
    const isSaved = card.likes.some((i) => i._id === currentUser._id);
    // api
    //   .changeCardLikeStatus(card._id, isLiked)
    //   .then((newCard) => {
    //     setCards((cards) =>
    //       cards.map((c) => (c._id === card._id ? newCard : c))
    //     );
    //   })
    // .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
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
                <Movies onCardSave={handleCardSave} />
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
                <Profile onLogout={handleLogout} onUserUpdate={handleUpdateUser}/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <PopupMenu isOpen={popupMenuState} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
