import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { messageText } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies() {
  const currentUser = React.useContext(CurrentUserContext);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const cardsCount = React.useRef();

  React.useEffect(() => {
    cardsCount.current = 0;
    mainApi
      .getMoviesData()
      .then((data) => {
        const savedMovies = data.filter(
          (item) => item.owner._id === currentUser._id
        );
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => console.log(err));
    localStorage.getItem("searchResult") === null
      ? setMessage(messageText.startSearch)
      : renderCards();
  }, []);

  async function renderCards() {
    const searchResult = JSON.parse(localStorage.getItem("searchResult"));
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    searchResult.length === 0
      ? setMessage(messageText.notFound)
      : setMessage("");
    cardsCount.current = countRenderedCards();
    const renderedCards = searchResult.slice(0, cardsCount.current);
    const fullCardsData = renderedCards.map((movie) => {
      const isSaved = savedMovies.some((item) => item.id === movie.id)
        ? true
        : false;
      return { movie, isSaved };
    });
    await setMovies(fullCardsData);
    cardsCount.current < searchResult.length
      ? setIsMoreButtonVisible(true)
      : setIsMoreButtonVisible(false);
  }

  async function updateRender() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const updatedCardsData = movies.map((movieKeyPare) => {
      movieKeyPare.isSaved = savedMovies.some((item) => item.id === movieKeyPare.movie.id)
        ? true
        : false;
      return movieKeyPare;
    });
    await setMovies(updatedCardsData);
  }

  function countRenderedCards() {
    const grid = document.getElementById("gridMovies");
    const columns = window
      .getComputedStyle(grid)
      .getPropertyValue("grid-template-columns");
    const columnsNumber = columns.split(" ").length;
    switch (columnsNumber) {
      case 3:
        return cardsCount.current === 0 ? 12 : cardsCount.current + 3;
      case 2:
        return cardsCount.current === 0 ? 8 : cardsCount.current + 2;
      default:
        return cardsCount.current === 0 ? 5 : cardsCount.current + 2;
    }
  }

  async function handleSearchRequest(searchString, checkBoxState) {
    setIsSearching(true);
    if (!localStorage.getItem("allMovies"))
      await Promise.resolve(moviesApi.getMoviesData())
        .then((moviesData) =>
          localStorage.setItem("allMovies", JSON.stringify(moviesData))
        )
        .catch((err) => setMessage(messageText.searchError));
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    await Promise.resolve(
      allMovies
        .filter((item) => (checkBoxState ? item.duration <= 40 : true))
        .filter((item) => item.nameRU.toLowerCase().includes(searchString))
    )
      .then((data) => {
        localStorage.setItem("searchString", searchString);
        localStorage.setItem("checkBoxState", checkBoxState);
        localStorage.setItem("searchResult", JSON.stringify(data));
      })
      .catch((err) => setMessage(messageText.searchError))
      .finally(() => setIsSearching(false));
    cardsCount.current = 0;
    renderCards();
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
        onSaveClick={updateRender}
        onMoreButtonClick={renderCards}
        isMoreButtonVisible={isMoreButtonVisible}
      />
    </div>
  );
}

export default Movies;
