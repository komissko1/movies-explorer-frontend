import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
// import moviesApi from "../../utils/MoviesApi";
import getSearchedMovies from "../../utils/Search/SearchHandler";

function Movies() {
  const [isSearching, setIsSearching] = React.useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [cardsRendered, setCardsRendered] = React.useState(0);
  const [message, setMessage] = React.useState("Начните поиск фильмов");

  React.useEffect(() => {
    console.log("on start");
    renderedCardsCount();
  }, []);

  React.useEffect(() => {
    console.log("new render");
    if (
      JSON.parse(localStorage.getItem("searchResult")) &&
      JSON.parse(localStorage.getItem("searchResult")) !== []
    ) {
      setMessage("");
      const renderedMovies = JSON.parse(localStorage.getItem("searchResult"));
      setMovies(renderedMovies.slice(0, cardsRendered));
      console.log(movies.length + "done" + cardsRendered + "planned");
      movies.length <= cardsRendered
        ? setIsMoreButtonVisible(true)
        : setIsMoreButtonVisible(false);
    }
  }, [cardsRendered]);

  function renderedCardsCount() {
    console.log("count cards");
    const grid = document.getElementById("gridMovies");
    const columns = window
      .getComputedStyle(grid)
      .getPropertyValue("grid-template-columns");
    const columnsNumber = columns.split(" ").length;
    switch (columnsNumber) {
      case 3:
        if (cardsRendered === 0) {
          setCardsRendered(12);
        } else {
          setCardsRendered(cardsRendered + 3);
        }
        break;
      case 2:
        if (cardsRendered === 0) {
          setCardsRendered(8);
        } else {
          setCardsRendered(cardsRendered + 2);
        }
        break;
      default:
        if (cardsRendered === 0) {
          setCardsRendered(5);
        } else {
          setCardsRendered(cardsRendered + 2);
        }
    }
    console.log(cardsRendered);
  }

  async function handleSearchRequest(searchString, checkBoxState) {
    setIsSearching(true);
    setCardsRendered(0);
    const searchResult = await getSearchedMovies(searchString, checkBoxState);
    setMessage(searchResult.message);
    setMovies(searchResult.movies);
    setIsSearching(false);
    renderedCardsCount();
  }

  return (
    <div className="movies">
      <SearchForm onSearchRequest={handleSearchRequest} />
      {isSearching ? (
        <Preloader />
      ) : (
        <p className="cardList__filler">{message}</p>
      )}
      <MoviesCardList
        movies={movies}
        onClick={renderedCardsCount}
        isMoreButtonVisible={isMoreButtonVisible}
      />
    </div>
  );
}

export default Movies;
