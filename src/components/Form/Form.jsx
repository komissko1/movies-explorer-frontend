import React from "react";
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <form className="form">
      <div className="form__elements">
        {props.children}
      </div>
      <button type="submit" className="form__save-button link-effect">
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
