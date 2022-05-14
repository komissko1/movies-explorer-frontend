import React from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function MovieCard(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = props.card.owner._id === currentUser._id;
  // const isSaved = props.card.likes.some((i) => i._id === currentUser._id);
  // const cardLikeButtonClassName = `place__like-button ${
    // isSaved ? "" : "place__like-button_inactive"
  // }`;

  function handleSaveClick() {
    props.onCardSave(props.card);
  }

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{props.card.nameRU}</p>
        <p className="card__length">{`${props.card.duration} минут`}</p>
      </div>
      <img
        className="card__image"
        src={`https://api.nomoreparties.co${props.card.image.url}`}
        alt={props.card.image.nameEN}
      />
      <div className="card__bottom">
        <button
          type="button"
          onClick={handleSaveClick}
          className={`card__button ${
            props.savedOnly ? "" : props.isSaved ? "card__button_saved" : ""
          }`}
        >{`${
          props.isSaved
            ? `${props.savedOnly ? "\u00D7" : "\u2713"}`
            : "Сохранить"
        }`}</button>
      </div>
    </div>
  );
}

export default MovieCard;
