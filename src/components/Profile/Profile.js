import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import api from "../../utils/MainApi";
import { alertText } from "../../utils/utils";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [updateMessage, setUpdateMessage] = React.useState("");
  const [validatedFields, setValidatedFields] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const nameRef = React.useRef();
  const emailRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = currentUser.name;
    emailRef.current.value = currentUser.email;
    setIsFormValid(true);
  }, []);

  const handleFieldChange = (e) => {
    setUpdateMessage("");
    const validatedKeyPare = { [e.target.id]: e.target.checkValidity() };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    if (
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(e.target.closest("form").checkValidity());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      api
        .patchUserData({
          name: nameRef.current.value,
          email: emailRef.current.value,
        })
        .then((userData) => {
          props.onUserUpdate(userData);
          setUpdateMessage("Данные пользователя обновлены");
        })
        .catch((err) => setUpdateMessage("Пользователь с таким адресом уже существует"));
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
          <span className="form__input-error" id="name-alert">
            {validatedFields.name === false ? alertText.name : ""}
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
          <span className="form__input-error" id="email-alert">
            {validatedFields.email === false ? alertText.email : ""}
          </span>
          <p className="form__update-result">{updateMessage}</p>
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
