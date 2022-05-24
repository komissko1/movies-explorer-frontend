import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";
import { alertText } from "../../utils/utils";

function Register(props) {
  const [validatedFields, setValidatedFields] = React.useState({
    name: true,
    email: true,
    password: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }, []);

  const handleFieldChange = (e) => {
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      props.onSignup({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="form">
      <a href="/" className="form__logo link-effect">
        <img src={logoPath} alt="Logotype" />
      </a>
      <p className="form__title">Добро пожаловать!</p>
      <Form
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label>
          Имя
          <input
            className="form__input"
            type="text"
            id="name"
            minLength="3"
            maxLength="50"
            placeholder="Имя"
            required
            ref={nameRef}
            onChange={handleFieldChange}
          />
          <span
            className={`form__input-error ${
              validatedFields.name ? "form__input-error_disabled" : ""
            }`}
            id="name-alert"
          >
            {alertText.name}
          </span>
        </label>
        <label>
          E-mail
          <input
            className="form__input"
            type="email"
            id="email"
            placeholder="E-mail"
            required
            ref={emailRef}
            onChange={handleFieldChange}
          />
          <span
            className={`form__input-error ${
              validatedFields.email ? "form__input-error_disabled" : ""
            }`}
            id="email-alert"
          >
            {alertText.email}
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
            ref={passwordRef}
            pattern="^[\w!@#\x26()$\x22{%}:;',?*~$^+=<>].*"
            onChange={handleFieldChange}
          />
          <span
            className={`form__input-error ${
              validatedFields.password ? "form__input-error_disabled" : ""
            }`}
            id="password-alert"
          >
            {alertText.password}
          </span>
        </label>
        <p
          className={`form__submit-result ${
            props.onSignupError ? "" : "form__submit-result_disabled"
          }`}
        >
          {alertText.serverError}
        </p>
      </Form>
      <p className="form__bottom-text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="form__bottom-link link-effect">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
