import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import accountPath from "../../images/account.svg";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className={`header ${props.mode ? props.mode : ""}`}>
      <>
        <a href="/" className="header__logo link-effect">
          <img src={logoPath} alt="Место" />
        </a>
        {props.loggedIn ? (
          <>
            <Navigation>
              <li className="link-effect">
                <Link to="/movies" className={`navBar__link ${props.mode ? props.mode : ""}`}>Фильмы</Link>
              </li>
              <li className="link-effect">
                <Link to="/saved-movies" className={`navBar__link ${props.mode ? props.mode : ""}`}>Сохраненные фильмы</Link>
              </li>
            </Navigation>
            <Link to="/profile" className="header__account link-effect">
              Аккаунт
              <img
                className="header__account-pic"
                src={accountPath}
                alt="Место"
              />
            </Link>
          </>
        ) : (
          <>
          <Navigation mode={props.mode}>
            <li><Link to="/signup" className={`navBar__link ${props.mode ? props.mode : ""}`}>Регистрация</Link></li>
          </Navigation>
            <Link to="/signin" className="header__login-link link-effect">
              Войти
            </Link>
          </>
        )}
      </>
    </header>
  );
}

export default Header;
