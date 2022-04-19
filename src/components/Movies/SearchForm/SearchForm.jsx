import React from "react";
import { Link } from "react-router-dom";

function SearchForm() {
  return (
    <>
    <div className="search">
      <div className="search__form">
        <input
          className="search__input"
          type="text"
          id="movie"
          minLength="3"
          maxLength="50"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search__button">Найти</button>
      </div>
      <label className="checkbox">
        <input type="checkbox"/>
        <p className="checkbox__text">Короткометражки</p>
      </label>
    </div>
    </>
  );
}

export default SearchForm;
