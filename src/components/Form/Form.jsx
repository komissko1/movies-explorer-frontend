import React from "react";
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <form className="form__container" onSubmit={props.onSubmit}>
      <div className="form__elements">{props.children}</div>
      <button
        type="submit"
        className={`form__save-button ${
          props.isFormValid ? "link-effect" : "form__save-button_disabled"
        }`}
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
