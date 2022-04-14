import React from "react";
// import * as auth from "../utils/auth.js";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <div className="profile__container">
      <h3 className="profile_title">Привет, Виталий!</h3>
      <p className="profile__container__bottom-text">
        Редактировать
        <Link to="/logout" className="profile__link link-effect">
          Выйти из эккаунта
        </Link>
      </p>
    </div>
  );
}

export default Profile;
