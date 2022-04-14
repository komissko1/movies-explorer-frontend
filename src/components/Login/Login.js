import React from "react";
// import * as auth from "../utils/auth.js";
import FormContainer from "../FormContainer/FormContainer";

function Login() {
  return (
    <FormContainer
      title="Рады видеть!"
      buttonText="Войти"
      text="Еще не зарегистрированы? "
      link="/signup"
      linkText="Регистрация"
    >
      <label>
        E-mail
        <input
          className="form__input"
          type="text"
          id="email"
          placeholder="E-mail"
          required
        />
        <span className="form__input-error" id="email-alert">
          Тестовое
        </span>
      </label>
      <label>
        Пароль
        <input
          className="form__input"
          type="password"
          id="password"
          minLength="3"
          maxLength="20"
          placeholder="Пароль"
          required
        />
        <span className="form__input-error" id="password-alert">
          Тестовое
        </span>
      </label>
    </FormContainer>
  );
}

export default Login;
