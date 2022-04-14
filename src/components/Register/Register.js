import React from "react";
// import * as auth from "../utils/auth.js";
import FormContainer from "../FormContainer/FormContainer";

function Register() {
  return (
    <FormContainer
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы? "
      link="/signin"
      linkText="Войти"
    >
      <label>
        Имя
        <input
          className="form__input"
          type="text"
          id="name"
          placeholder="Имя"
          required
        />
        <span className="form__input-error" id="name-alert">
          Тестовое
        </span>
      </label>
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

export default Register;
