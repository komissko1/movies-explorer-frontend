import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
//   useNavigate,
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import Main from "../Main/Main";
// import Profile from "../Profile/";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// import api from "../../utils/api.js";
// import * as auth from "../../utils/auth";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  // const [currentUser, setCurrentUser] = React.useState({name: 'sasa'});
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const location = useLocation();
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   handleTockenCheck(location.pathname);
  // }, []);

  return (
    // <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>
          <Route
            path="/signin"
            element={
              <Login/>
            }
          />
          <Route
            path="/signup"
            element={<Register/>}
          />
          <Route
            path="/404"
            element={<PageNotFound/>}
          />
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={isLoggedIn} mode="blue-mode"/>
                <Main/>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Header loggedIn={isLoggedIn}/>
                <Preloader />
                {/* <Main /> */}
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Header loggedIn={isLoggedIn}/>
                <Preloader />
                {/* <Main /> */}
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Header loggedIn={isLoggedIn}/>
                {/* <Profile /> */}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/404" />}/>
        </Routes>
      </div>

    // </CurrentUserContext.Provider>
  );
}

export default App;
