import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Footer(props) {
  return (
    <footer className="footer">
      <p3 href="https://yandex.ru/" className="footer__title">
        Учебный проект Яндекс.Практикум х Gdzenn.
      </p3>
      <div className="footer__bottom-line">
        &copy; 2022
        <ul className="footer__links">
          <li className="footer__link link-effect">
            <Link to="/sign-in">Яндекс.Практикум</Link>
          </li>
          <li className="footer__link link-effect">
            <Link to="/sign-in">Github</Link>
          </li>
          <li className="footer__link link-effect">
            <Link to="/sign-in">Facebook</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
