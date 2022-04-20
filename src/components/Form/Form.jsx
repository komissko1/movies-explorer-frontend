import React from "react";
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <form className="form__container">
      <div className="form__elements">
        {props.children}
      </div>
      <button type="submit" className={`form__save-button ${props.type === "profile" ? "form__save-button_disabled" : "link-effect"}`}>
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
