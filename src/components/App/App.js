import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import api from "../../utils/MainApi"
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [popupMenuState, setPopupMenuState] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isSignupError, setIsSignupError] = React.useState(false);
  const [isProfileUpdateError, setIsProfileUpdateError] = React.useState(false);
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
          setCurrentUser(res);
          setIsLoggedIn(true);
          path === ("/signin" || "/signup") ? navigate("/") : navigate(path);
        }
      });
    }
  };

  const handleSignup = ({ name, email, password }) => {
    auth
      .register({ name, email, password })
      .then((res) => {
          navigate("/signin");
        }
      )
      .catch(() => setIsSignupError(true));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.user._id);
          setCurrentUser(res.user);
          setIsLoggedIn(true);
          navigate("/movies");
        }
      )
      .catch(() => setIsLoginError(true));
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  function handleUpdateUser({ name, email }) {
    api
      .patchUserData({ name, email })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(() => setIsProfileUpdateError(true));
  }

  function handleMenuClick() {
    setPopupMenuState(!popupMenuState);
  }

  function closePopup() {
    setPopupMenuState(!popupMenuState);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root__container">
        <Routes>
          <Route
            path="/signin"
            element={
              <Login onLogin={handleLogin} onLoginError={isLoginError} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register onSignup={handleSignup} onSignupError={isSignupError} />
            }
          />
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
                <Profile
                  onLogout={handleLogout}
                  onUserUpdate={handleUpdateUser}
                  onUpdateError={isProfileUpdateError}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<PageNotFound onReturn={() => navigate(-1)} />}
          />
        </Routes>
        <PopupMenu isOpen={popupMenuState} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
