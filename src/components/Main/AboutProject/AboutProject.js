import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AboutProject() {
  return (
    <div className="aboutProject">
      <h2 className="aboutProject__header">О проекте</h2>
      <div className="aboutProject__cards">
        <div className="aboutProject__card">
          <p className="aboutProject__card-title">Дипломный проект включал 5 этапов</p>
          <p className="aboutProject__card-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="aboutProject__card">
          <p className="aboutProject__card-title">На выполнение диплома ушло 5 недель</p>
          <p className="aboutProject__card-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutProject__timing">
        <p className="aboutProject__cell aboutProject__cell_green">1 неделя</p>
        <p className="aboutProject__cell aboutProject__cell_grey">4 недели</p>
        <p className="aboutProject__cell aboutProject__cell_light">Back-end</p>
        <p className="aboutProject__cell aboutProject__cell_light">Front-end</p>
      </div>
    </div>
  )
}

export default AboutProject
