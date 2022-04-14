import React from "react";
// import * as auth from "../utils/auth.js";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import Form from "../Form/Form";

function FormContainer(props) {
  return (
    <div className="form-container">
      <a href="/" className="form__logo link-effect">
        <img src={logoPath} alt="Logotype" />
      </a>
      <h3 className="form__title">{props.title}</h3>
      <Form buttonText={props.buttonText}>{props.children}</Form>
      <p className="form-container__bottom-text">
        {props.text}
        <Link to={props.link} className="form-container__link link-effect">
          {props.linkText}
        </Link>
      </p>
    </div>
  );
}

export default FormContainer;
