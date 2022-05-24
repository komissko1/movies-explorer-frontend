import React from "react";
import myFoto from "../../../images/myFoto.png";

function AboutMe() {
  return (
    <div className="aboutMe">
      <h2 className="aboutMe__header">Студент</h2>
      <div className="aboutMe__section">
        <img className="aboutMe__pic" src={myFoto} alt="Foto" />
        <div className="aboutMe__info">
          <p className="aboutMe__title">Факсимилиан</p>
          <p className="aboutMe__job">Фронтенд-разработчик, 45 лет</p>
          <p className="aboutMe__text">
            Я родился в Шостке, жил еще в пяти городах. Закончил факультет
            экономики СумГУ. У меня есть семья. Я люблю слушать музыку. Недавно
            начал кодить. С незапамятных времен работал в разных компаниях.
            После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и улетел в космос.
          </p>
          <ul className="aboutMe__links">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer noopener" className="aboutMe__link link-effect">Facebook</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer noopener" className="aboutMe__link link-effect">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
