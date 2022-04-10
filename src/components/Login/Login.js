import React from "react";
// import { useNavigate } from "react-router-dom";
// import * as auth from "../utils/auth.js";
import { Link, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";

function Login() {
  return (
    <div className="login-container">
      <Form buttonText="Войти">
      <a href="/" className="form__logo link-effect">
        <img
          src={logoPath}
          alt="Logotype"
          />
      </a>
        <h3 className="form__title">Рады видеть!</h3>
        <label>E-mail
          <input
            className="form__input"
            type="text"
            id="email"
            placeholder="E-mail"
            required
          />
          <span className="form__input-error" id="email-alert">Тестовое</span>
        </label>
        <label>Пароль
          <input
            className="form__input"
            type="password"
            id="password"
            minLength="3"
            maxLength="20"
            placeholder="Пароль"
            required
          />
          <span className="form__input-error" id="password-alert">Тестовое</span>
        </label>
      </Form>
      <p className="login-container__bottom-text">
        Еще не зарегистрированы?{" "}
        <Link to="/signup" className="login-container__link link-effect">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
