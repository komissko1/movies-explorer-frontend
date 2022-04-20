import React from "react";

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
            <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer noopener">Яндекс.Практикум</a>
          </li>
          <li className="footer__link link-effect">
            <a href="https://github.com" target="_blank" rel="noreferrer noopener">Github</a>
          </li>
          <li className="footer__link link-effect">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer noopener">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
