import React from "react";
import * as auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";
import FormValidation from "../../utils/Validation/FormValidation";

function Login(props) {
  const [alertMessage, setAlertMessage] = React.useState({});
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldsData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const message = FormValidation(fieldsData);
    setAlertMessage(message);
    if (!message.error)
      auth.authorize(fieldsData)
        .then((res) => {
          if (res.user._id) {
            localStorage.setItem('jwt', res.user._id);
            props.onLogin();
            passwordRef.current.value = "";
            emailRef.current.value = "";
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="form">
      <a href="/" className="form__logo link-effect">
        <img src={logoPath} alt="Logotype" />
      </a>
      <p className="form__title">Рады видеть!</p>
      <Form buttonText="Войти" onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            className="form__input"
            type="text"
            id="email"
            placeholder="E-mail"
            ref={emailRef}
            required
          />
          <span className="form__input-error" id="email-alert">
            {alertMessage.email}
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
            ref={passwordRef}
            required
          />
          <span className="form__input-error" id="password-alert">
            {alertMessage.password}
          </span>
        </label>
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
