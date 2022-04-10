import React from "react";
// import { useNavigate } from "react-router-dom";
// import * as auth from "../utils/auth.js";
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-404">
        <h3 className="page-404__title">404</h3>
        <p className="page-404__text">Страница не найдена</p>
      <Link to="/signin" className="page-404__link link-effect">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
