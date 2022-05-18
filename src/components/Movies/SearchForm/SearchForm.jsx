import React from "react";

function SearchForm(props) {
  const [alertMessage, setAlertMessage] = React.useState("");
  const movieRef = React.useRef();
  const checkBoxRef = React.useRef();

  React.useEffect(() => {
    if (props.savedOnly) return;
    if (localStorage.getItem("searchString")) {
      movieRef.current.value = localStorage.getItem("searchString");
      checkBoxRef.current.checked = localStorage.getItem("checkBoxState") === "false" ? false : true ;
    }
  }, []);

  const handleFieldChange = (e) => {
    if (movieRef.current.value === "") {
      setAlertMessage("Нужно ввести ключевое слово");
    } else {
      e.target.checkValidity()
        ? setAlertMessage("")
        : setAlertMessage("Строка поиска содержит менее трех символов");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.closest("form").checkValidity())
      props.onSearchRequest(
        movieRef.current.value.toLowerCase(),
        checkBoxRef.current.checked
      );
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
          onChange={handleFieldChange}
          ref={movieRef}
        />
        <button type="submit" className="search__button">
          Найти
        </button>
        <span className="search__input-error">{alertMessage}</span>
      </label>
      <label className="checkbox">
        <input type="checkbox" id="ShortMeterCheck" ref={checkBoxRef}/>
        <p className="checkbox__text">Короткометражки</p>
      </label>
    </form>
  );
}

export default SearchForm;
