import React from "react";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__items">
        <li>
          <a
            className="portfolio__link"
            href="https://komissko1.github.io/russian-travel/index.html"
            target="_blank"
            rel="noreferrer noopener"
          >
          <p>Статичный сайт</p>
          &#8599;
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://komissko1.github.io/mesto/"
            target="_blank"
            rel="noreferrer noopener"
          >
          <p>Адаптивный сайт</p>
          &#8599;
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://mesto-komisarov.students.nomoredomains.work/"
            target="_blank"
            rel="noreferrer noopener"
          >
          <p>Одностраничное приложение</p>
          &#8599;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
