import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";
import { alertText } from "../../utils/utils";

function Login(props) {
  const [validatedFields, setValidatedFields] = React.useState({
    email: true,
    password: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
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
      props.onLogin({
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
      <p className="form__title">Рады видеть!</p>
      <Form
        buttonText="Войти"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
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
            props.onLoginError ? "" : "form__submit-result_disabled"
          }`}
        >
          {alertText.authorizationError}
        </p>
      </Form>
      <p className="form__bottom-text">
        Еще не зарегистрированы?{" "}
        <Link to="/signup" className="form__bottom-link link-effect">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
