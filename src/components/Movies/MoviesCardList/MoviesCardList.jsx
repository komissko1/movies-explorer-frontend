import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList(props) {

  return (
    <>
      <section className="cardList" id="gridMovies" aria-label="Films">
        {props.movies.map((item) => (
          <MovieCard
            card={item}
            // nameRU={item.nameRU}
            // duration={item.duration}
            // image={item.image}
            // trailerLink={item.trailerLink}
            isSaved={item.isSaved}
            savedOnly={props.savedOnly}
            key={item.id}
            onCardSave={props.onCardSave}
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
            onClick={props.onClick}
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
