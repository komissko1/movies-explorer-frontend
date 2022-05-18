import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import navButton from "../../images/navTabButton.svg";
import navButton_bluemode from "../../images/navTabButton_bluemode.svg";
import accountPath from "../../images/account.svg";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const [windowSize, setwindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    var resizeTimer;
    window.onresize = function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        setwindowSize(window.innerWidth);
        resizeTimer = null;
      }, 500);
    };
  }, [windowSize]);

  return (
    <header className={`header ${props.mode ? props.mode : ""}`}>
      <a href="/" className="header__logo link-effect">
        <img src={logoPath} alt="Место" />
      </a>
      {props.loggedIn ? (
        windowSize <= 768 ? (
          <img
            onClick={props.onClick}
            className="header__navBar-button link-effect"
            src={`${props.mode ? navButton_bluemode : navButton}`}
            alt="Меню"
          />
        ) : (
          <>
            <Navigation>
              <li className="link-effect">
                <NavLink
                  to="/movies"
                  className={({isActive}) => isActive
                  ? `navBar__link navBar__link_active ${props.mode ? props.mode : ""}`
                  : `navBar__link ${props.mode ? props.mode : ""}`}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="link-effect">
                <NavLink
                  to="/saved-movies"
                  className={({isActive}) => isActive
                  ? `navBar__link navBar__link_active ${props.mode ? props.mode : ""}`
                  : `navBar__link ${props.mode ? props.mode : ""}`}
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </Navigation>
            <Link to="/profile" className="header__account link-effect">
              Аккаунт
              <img
                className="header__account-pic"
                src={accountPath}
                alt="Профиль"
              />
            </Link>
          </>
        )
      ) : (
        <>
          <Navigation mode={props.mode}>
            <li>
              <Link
                to="/signup"
                className={`navBar__link link-effect ${
                  props.mode ? props.mode : ""
                }`}
              >
                Регистрация
              </Link>
            </li>
          </Navigation>
          <Link to="/signin" className="header__login-link link-effect">
            Войти
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
