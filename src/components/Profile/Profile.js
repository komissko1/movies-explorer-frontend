import React from "react";
// import * as auth from "../utils/auth.js";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function Profile(props) {
  return (
    <div className="profile">
      <p className="profile__title">Привет, Виталий!</p>
      <Form buttonText="Редактировать" type="profile">
        <label className="profile__label">Имя
          <input
            className="profile__input"
            type="text"
            id="name"
            placeholder="Имя"
            defaultValue="Виталий"
            required
          />
        </label>
        <label className="profile__label">E-mail
          <input
            className="profile__input"
            type="text"
            id="email"
            minLength="3"
            maxLength="20"
            defaultValue="pochta@yandex.ru"
            placeholder="E-mail"
            required
          />
        </label>
      </Form>
      <Link to="/logout" className="profile__link link-effect">
        Выйти из эккаунта
      </Link>
    </div>
  );
}

export default Profile;
