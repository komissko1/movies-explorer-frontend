import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import { alertText } from "../../utils/utils";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [validatedFields, setValidatedFields] = React.useState({
    name: true,
    email: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isResultVisible, setIsResultVsisble] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = currentUser.name;
    emailRef.current.value = currentUser.email;
  }, []);

  const handleFieldChange = (e) => {
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      props.onUserUpdate({
        name: nameRef.current.value,
        email: emailRef.current.value,
      });
      setIsResultVsisble(true);
    }
  };

  return (
    <div className="profile">
      <p className="profile__title">{`Привет, ${currentUser.name}!`}</p>
      <Form
        buttonText="Редактировать"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <div className="profile__form">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name"
              minLength="3"
              maxLength="50"
              placeholder="Имя"
              required
              ref={nameRef}
              onChange={handleFieldChange}
            />
          </label>
          <span
            className={`form__input-error ${
              validatedFields.name ? "form__input-error_disabled" : ""
            }`}
            id="name-alert"
          >
            {alertText.name}
          </span>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email"
              placeholder="E-mail"
              required
              ref={emailRef}
              onChange={handleFieldChange}
            />
          </label>
          <span
            className={`form__input-error ${
              validatedFields.email ? "form__input-error_disabled" : ""
            }`}
            id="email-alert"
          >
            {alertText.email}
          </span>
          <p
            className={`form__submit-result ${
              isResultVisible ? "" : "form__submit-result_disabled"
            }`}
          >
            {props.onUpdateError
              ? alertText.serverError
              : alertText.profileUpdated}
          </p>
        </div>
      </Form>
      <Link
        to="/"
        className="profile__link link-effect"
        onClick={props.onLogout}
      >
        Выйти из эккаунта
      </Link>
    </div>
  );
}

export default Profile;
