import React from "react";
// import { useNavigate } from "react-router-dom";
// import * as auth from "../utils/auth.js";
import { Link, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";

function Register() {
  return (
    <div className="register-container">
      <Form buttonText="Зарегистрироваться">
      <a href="/" className="form__logo link-effect">
        <img
          src={logoPath}
          alt="Logotype"
          />
      </a>
        <h3 className="form__title">Добро пожаловать!</h3>
        <label>Имя
          <input
            className="form__input"
            type="text"
            id="name"
            placeholder="Имя"
            required
          />
          <span className="form__input-error" id="name-alert">Тестовое</span>
        </label>
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
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login-container__link link-effect">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
