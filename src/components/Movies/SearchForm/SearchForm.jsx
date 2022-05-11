import React from "react";
import SearchValidation from "../../../utils/Search/SearchValidation.js";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SearchForm(props) {
  const [searchString, setSearchString] = React.useState("");
  const [checkBoxState, setCheckBoxState] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const checkBoxRef = React.useRef();

  React.useEffect(() => {
    if (localStorage.getItem("searchString")) {
      setSearchString(localStorage.getItem("searchString"));
      setCheckBoxState(localStorage.getItem("checkBoxState"));
    }
  }, []);

  function handleSearchString(e) {
    setSearchString(e.target.value);
  }

  function handleCheckBoxChange(e) {
    setCheckBoxState(checkBoxRef.current.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = SearchValidation(searchString);
    setAlertMessage(message);
    if (!message) props.onSearchRequest(searchString, checkBoxState);
  }

  return (
    <form className="search" id="form" onSubmit={handleSubmit} noValidate>
      <label className="search__form">
        <input
          className="search__input"
          type="text"
          id="movie"
          minLength="3"
          maxLength="50"
          placeholder="Фильм"
          required
          onChange={handleSearchString}
          value={searchString}
        />
        <button type="submit" className="search__button">
          Найти
        </button>
        <span className="search__input-error">{alertMessage}</span>
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          id="ShortMeterCheck"
          onChange={handleCheckBoxChange}
          ref={checkBoxRef}
        />
        <p className="checkbox__text">Короткометражки</p>
      </label>
    </form>
  );
}

export default SearchForm;
