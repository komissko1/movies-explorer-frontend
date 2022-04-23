import React from "react";

function MovieCard(props) {
  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{props.nameRU}</p>
        <p className="card__length">{`${props.duration} минут`}</p>
      </div>
      <img className="card__image" src={`https://api.nomoreparties.co${props.image.url}`} alt={props.image.nameEN} />
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
