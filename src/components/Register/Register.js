import React, { useEffect } from "react";
import * as auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";
import FormValidation from "../../utils/Validation/FormValidation";
import { alertText } from "../../utils/utils";

function Register(props) {
  const [isValidated, setIsValidated] = React.useState({
    name: false,
    email: false,
    password: false,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    Object.values(isValidated).some((item) => item === false)
      ? setIsFormValid(false)
      : setIsFormValid(true);
  }, [isValidated])

  const handleChange = (e) => {
    const validatedKeyPare = FormValidation({
      fieldName: e.target.id,
      value: e.target.value,
    });
    setIsValidated({ ...isValidated, ...validatedKeyPare });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const fieldsData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      auth
        .register(fieldsData)
        .then((res) => {
          if (res.email) {
            navigate("/signin");
          }
        })
        .catch((err) => console.log(err));
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
            placeholder="Имя"
            required
            ref={nameRef}
            onChange={handleChange}
          />
          <span className="form__input-error" id="name-alert">
            {isValidated.name ? "" : alertText.name}
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
            ref={emailRef}
            onChange={handleChange}
          />
          <span className="form__input-error" id="email-alert">
            {isValidated.email ? "" : alertText.email}
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
            onChange={handleChange}
          />
          <span className="form__input-error" id="password-alert">
            {isValidated.password ? "" : alertText.password}
          </span>
        </label>
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
