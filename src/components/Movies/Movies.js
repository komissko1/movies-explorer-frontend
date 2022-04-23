import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.getItem("searchString")) {
      const searchResult = JSON.parse(localStorage.getItem("searchResult"));
      setMovies(searchResult);
    }
  }, []);

  function handleSearchRequest(movie, checkBoxState) {
    setIsLoading(true);
    const moviesData = JSON.parse(localStorage.getItem("cards"));
    Promise.resolve(
      moviesData
        .filter((item) => (checkBoxState ? item.duration <= 40 : true))
        .filter((item) => item.nameRU.includes(movie))
    )
      .then((data) => {
        setMovies(data);
        localStorage.setItem("searchResult", JSON.stringify(data));
      })
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
    localStorage.setItem("searchString", movie);
    localStorage.setItem("checkBoxState", checkBoxState);
  }

  return (
    <div className="movies">
      <SearchForm onSearchRequest={handleSearchRequest} />
      {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
    </div>
  );
}

export default Movies;
