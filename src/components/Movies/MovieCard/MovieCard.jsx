import React from "react";
import mainApi from "../../../utils/MainApi";

function MovieCard(props) {

  function handleSaveClick() {
    props.savedOnly
    ? handleCardDelete()
    : handleCardStateChange()
  }

  function handleCardDelete() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    mainApi
    .deleteMovieData(props.movie._id)
    .then(() => {
      const updatedSavedMovies = savedMovies.filter(item => item.id !== props.movie.id);
      localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
    })
    .catch((err) => console.log(err));
    props.onSaveClick();
  }

  async function handleCardStateChange() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (props.isSaved) {
      const movieWithId = savedMovies.find((item) => item.id === props.movie.id);
      await mainApi
        .deleteMovieData(movieWithId._id)
        .then(() => {
          const updatedSavedMovies = savedMovies.filter(
            (item) => item.id !== props.movie.id
          );
          localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
        })
        .catch((err) => console.log(err));
    } else {
      await mainApi
        .postMovieData(props.movie)
        .then((newMovie) => {
          savedMovies.push(newMovie);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        })
        .catch((err) => console.log(err));
    };
    props.onSaveClick();
  }


  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{props.movie.nameRU}</p>
        <p className="card__length">{`${props.movie.duration} минут`}</p>
      </div>
      <img
        className="card__image"
        src={`https://api.nomoreparties.co${props.movie.image.url}`}
        alt={props.movie.image.nameEN}
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
