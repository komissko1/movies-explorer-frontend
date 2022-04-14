import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../images/closeIcon.png";
import accountPath from "../../images/account.svg";

function PopupMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  return (
    <dir className={`popupMenu ${isOpen ? "popupMenu_opened" : ""}`}>
      <img
        className="popupMenu__close-button link-effect"
        src={closeIcon}
        alt="Закрыть"
        onClick={onClose}
      />
      <>
        <ul className="popupMenu__items">
          <li className="link-effect">
            <Link
              to="/"
              className={'popupMenu__link'}
            >
              Главная
            </Link>
          </li>
          <li className="link-effect">
            <Link
              to="/movies"
              className={'popupMenu__link'}
            >
              Фильмы
            </Link>
          </li>
          <li className="link-effect">
            <Link
              to="/saved-movies"
              className={'popupMenu__link'}
            >
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="popupMenu__account link-effect">
          Аккаунт
          <img className="popupMenu__account-pic" src={accountPath} alt="Профиль" />
        </Link>
      </>
    </dir>
  );
}

export default PopupMenu;
