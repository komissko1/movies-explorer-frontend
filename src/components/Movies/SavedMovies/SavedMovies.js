import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../../utils/MainApi";
import {messageText} from "../../../utils/utils"


function SavedMovies() {
  const [isSearching, setIsSearching] = React.useState(false);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const cardsCount = React.useRef();

  React.useEffect(() => {
    Promise.resolve(mainApi.getMoviesData())
    .then((moviesData) =>
      localStorage.setItem("savedMovies", JSON.stringify(moviesData))
    )
    .catch((err) => setMessage(messageText.searchError));
  }, []);

  async function renderCards() {
    const searchResult = JSON.parse(localStorage.getItem("searchResult"));
    searchResult.length === 0 ? setMessage(messageText.notFound) : setMessage("");
    cardsCount.current = countRenderedCards();
    await setMovies(searchResult.slice(0, cardsCount.current));
    cardsCount.current < searchResult.length
      ? setIsMoreButtonVisible(true)
      : setIsMoreButtonVisible(false);
  }

  function countRenderedCards() {
    const grid = document.getElementById("gridMovies");
    const columns = window
      .getComputedStyle(grid)
      .getPropertyValue("grid-template-columns");
    const columnsNumber = columns.split(" ").length;
    switch (columnsNumber) {
      case 3:
        return cardsCount.current === 0 ? 12 : (cardsCount.current + 3);
      case 2:
        return cardsCount.current === 0 ? 8 : (cardsCount.current + 2);
      default:
        return cardsCount.current === 0 ? 5 : (cardsCount.current + 2);
    }
  }

  async function handleSearchRequest(searchString, checkBoxState) {
    setIsSearching(true);
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    await Promise.resolve(
      allMovies
        .filter((item) => (checkBoxState ? item.duration <= 40 : true))
        .filter((item) => item.nameRU.includes(searchString))
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
      <SearchForm />
      <Preloader />
      <MoviesCardList savedOnly={true}/>
    </div>
  )
}

export default SavedMovies
