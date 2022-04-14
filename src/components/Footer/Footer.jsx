import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Footer(props) {
  return (
    <footer className="footer">
      <h3 href="https://yandex.ru/" className="footer__title">
        Учебный проект Яндекс.Практикум х Gdzenn.
      </h3>
      <div className="footer__bottom-line">
        <div className="footer__copyright">&copy; 2022</div>
        <ul className="footer__links">
          <li className="footer__link link-effect">
            <a href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          </li>
          <li className="footer__link link-effect">
            <a href="https://github.com">Github</a>
          </li>
          <li className="footer__link link-effect">
            <a href="https://www.facebook.com">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
