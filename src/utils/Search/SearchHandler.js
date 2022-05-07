import moviesApi from "../MoviesApi";

const messageText = {
  notFound: "Ничего не найдено",
  searchError:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
};

async function getSearchedMovies(searchString, checkBoxState) {
  const searchResult = { movies: [], message: "" };
  await Promise.resolve(moviesApi.getMoviesData())
    .then((moviesData) => {
      Promise.resolve(
        moviesData
          .filter((item) => (checkBoxState ? item.duration <= 40 : true))
          .filter((item) => item.nameRU.includes(searchString))
      )
        .then((data) => {
          localStorage.setItem("searchString", searchString);
          localStorage.setItem("checkBoxState", checkBoxState);
          localStorage.setItem("searchResult", JSON.stringify(data));
          if (data.length === 0) searchResult.message = messageText.notFound;
          searchResult.movies = data;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => (searchResult.message = messageText.searchError));
  return searchResult;
}

export default getSearchedMovies;
