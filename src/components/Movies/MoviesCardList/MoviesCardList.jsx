import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList(props) {

  return (
    <>
      <section className="cardList" id="gridMovies" aria-label="Films">
        {props.movies.map((item) => (
          <MovieCard
            movie={item.movie}
            isSaved={item.isSaved}
            savedOnly={props.savedOnly}
            key={item.movie.id}
            onSaveClick={props.onSaveClick}
          />
        ))}
      </section>
      {props.movies !== [] ? (
        <section className="cardList__addCards">
          <button
            type="button"
            className={`cardList__button ${
              props.isMoreButtonVisible ? "" : "cardList__button_invisible"
            }`}
            onClick={props.onMoreButtonClick}
          >
            Ещё
          </button>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default MoviesCardList;
