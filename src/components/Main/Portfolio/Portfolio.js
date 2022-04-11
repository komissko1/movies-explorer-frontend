import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <div className="portfolio__items">
        <p className="portfolio__item">Статичный сайт</p>
        <p className="portfolio__item">&#8599;</p>
        <p className="portfolio__item">Адаптивный сайт</p>
        <p className="portfolio__item">&#8599;</p>
        <p className="portfolio__item">Одностраничное приложение</p>
        <p className="portfolio__item">&#8599;</p>
      </div>
    </div>
  )
}

export default Portfolio
