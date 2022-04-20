import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import cardList from "../../../utils/cardList";

function MoviesCardList(props) {
  return (
    <>
      <section className="cardList" aria-label="Фильмы">
        {props.savedOnly
          ? cardList
              .filter((item) => item.isSaved)
              .map((item) => (
                <MovieCard
                  title={item.title}
                  length={item.length}
                  image={item.image}
                  isSaved={item.isSaved}
                  savedOnly={props.savedOnly}
                />
              ))
          : cardList.map((item) => (
              <MovieCard
                title={item.title}
                length={item.length}
                image={item.image}
                isSaved={item.isSaved}
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
  );
}

export default MoviesCardList;
