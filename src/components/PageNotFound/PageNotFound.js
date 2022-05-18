import React from "react";

function PageNotFound(props) {

  return (
    <div className="page-404">
        <h3 className="page-404__title">404</h3>
        <p className="page-404__text">Страница не найдена</p>
      <button onClick={props.onReturn} className="page-404__link link-effect">
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;
