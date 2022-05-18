import React from "react";
import * as auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";
import { alertText } from "../../utils/utils";

function Login(props) {
  const [validatedFields, setValidatedFields] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErrorMessage("");
    if (isFormValid) {
      const fieldsData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      auth
        .authorize(fieldsData)
        .then((res) => {
          if (res.user._id) {
            localStorage.setItem("jwt", res.user._id);
            props.onLogin(res.user);
            passwordRef.current.value = "";
            emailRef.current.value = "";
            navigate("/movies");
          }
        })
        .catch((err) => setLoginErrorMessage("Ошибка авторизации"));
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
          <span className="form__input-error" id="email-alert">
            {validatedFields.email === false ? alertText.email : ""}
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
          <span className="form__input-error" id="password-alert">
            {validatedFields.password === false ? alertText.password : ""}
          </span>
        </label>
        <p className="form__update-result">{loginErrorMessage}</p>
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
