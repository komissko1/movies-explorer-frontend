import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../../utils/MainApi";
import { messageText } from "../../../utils/utils";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isSearching, setIsSearching] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    Promise.resolve(mainApi.getMoviesData())
      .then((moviesData) => {
        const savedMovies = moviesData.filter(item => item.owner._id === currentUser._id);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        const renderedMovies = savedMovies.map((item)=> {return {movie: item, isSaved: true}})
        setMovies(renderedMovies);
      })
      .catch((err) => setMessage(messageText.searchError));
  }, []);

  async function handleSearchRequest(searchString, checkBoxState) {
    setIsSearching(true);
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    await Promise.resolve(
      savedMovies
        .filter((item) => (checkBoxState ? item.duration <= 40 : true))
        .filter((item) => item.nameRU.toLowerCase().includes(searchString))
    )
      .then((data) => {
        data.length === 0 ? setMessage(messageText.notFound) : setMessage("");
        setMovies(data.map((movie) => {
          return {movie: movie, isSaved: true};
        }));
      })
      .catch((err) => setMessage(messageText.searchError))
      .finally(() => setIsSearching(false));
  }

  function handleSaveClick() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const updatedCardsData = savedMovies.map((movie) => {
      return {movie: movie, isSaved: true};
    });
    setMovies(updatedCardsData);
  }

  return (
    <div className="movies">
      <SearchForm onSearchRequest={handleSearchRequest} savedOnly={true} />
      {isSearching ? (
        <Preloader />
      ) : (
        <p className="cardList__filler">{message}</p>
      )}
      <MoviesCardList
        movies={movies}
        onSaveClick={handleSaveClick}
        isMoreButtonVisible={false}
      />
    </div>
  );
}

export default SavedMovies;
