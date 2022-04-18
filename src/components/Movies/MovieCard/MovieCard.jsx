import React from "react";
import { Link } from "react-router-dom";
import imgPath from "../../../images/pic.svg";

function MovieCard(props) {
  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{props.title}</p>
        <p className="card__length">{props.length}</p>
      </div>
      <img className="card__image" src={imgPath} alt="movieImage" />
      <div className="card__bottom">
        <button
          type="button"
          className={`card__button ${
            props.savedOnly ? "" : props.isSaved ? "card__button_saved" : ""
          }`}
        >{`${props.isSaved ? `${props.savedOnly ? "\u00D7" : "\u2713"}` : "Сохранить"}`}</button>
      </div>

    </div>
  );
}

export default MovieCard;
