import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList(props) {
  return (
    <>
      {props.movies.length !== 0 ? (
        <>
          <section className="cardList" aria-label="Фильмы">
            {props.savedOnly
              ? props.movies
                  .filter((item) => item.isSaved)
                  .map((item) => (
                    <MovieCard
                      nameRU={item.nameRU}
                      duration={item.duration}
                      image={item.image}
                      trailerLink={item.trailerLink}
                      isSaved={item.isSaved}
                      savedOnly={props.savedOnly}
                      key={item.id}
                    />
                  ))
              : props.movies.map((item) => (
                  <MovieCard
                    nameRU={item.nameRU}
                    duration={item.duration}
                    image={item.image}
                    trailerLink={item.trailerLink}
                    isSaved={item.isSaved}
                    key={item.id}
                  />
                ))}
          </section>
          <section className="cardList__addCards">
            <button
              type="button"
              className={`cardList__button ${
                props.savedOnly ? "cardList__button_invisible" : ""
              }`}
            >
              Ещё
            </button>
          </section>
        </>
      ) : (
        <p className="cardList__filler">Начните поиск фильмов</p>
      )}
    </>
  );
}

export default MoviesCardList;
