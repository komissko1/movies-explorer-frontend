import React from "react";
import mainApi from "../../../utils/MainApi";

function MovieCard(props) {
  async function handleSaveClick() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (props.savedOnly) {
      await handleCardDelete(props.movie._id, savedMovies);
    } else {
      if (props.isSaved) {
        const movieWithId = savedMovies.find(
          (item) => item.id === props.movie.id
        );
        await handleCardDelete(movieWithId._id, savedMovies);
      } else {
        await handleCardPost(props.movie, savedMovies);
      }
    }
    props.onSaveClick();
  }

  async function handleCardDelete(cardId, savedMovies) {
    await mainApi
      .deleteMovieData(cardId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(
          (item) => item.id !== props.movie.id
        );
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => alert(err));
  }

  async function handleCardPost(movie, savedMovies) {
    await mainApi
      .postMovieData(movie)
      .then((newMovie) => {
        savedMovies.push(newMovie);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{props.movie.nameRU}</p>
        <p className="card__length">{`${props.movie.duration} минут`}</p>
      </div>
      <a
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          className="card__image"
          src={`https://api.nomoreparties.co${props.movie.image.url}`}
          alt={props.movie.image.nameEN}
        />
      </a>
      <div className="card__bottom">
        <button
          type="button"
          onClick={handleSaveClick}
          className={`card__button ${
            props.savedOnly
              ? ""
              : `${props.isSaved ? "card__button_saved" : ""}`
          }`}
        >
          {props.savedOnly
            ? "\u00D7"
            : `${props.isSaved ? "\u2713" : "Сохранить"}`}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
