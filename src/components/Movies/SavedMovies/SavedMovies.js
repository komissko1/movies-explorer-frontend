import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <div className="movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList savedOnly={true}/>
    </div>
  )
}

export default SavedMovies
