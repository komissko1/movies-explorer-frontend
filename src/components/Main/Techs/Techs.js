import React from "react";

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__header">Технологии</h2>
      <p className="techs__title">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__items">
        <p className="techs__item">HTML</p>
        <p className="techs__item">CSS</p>
        <p className="techs__item">JS</p>
        <p className="techs__item">React</p>
        <p className="techs__item">Git</p>
        <p className="techs__item">Express.js</p>
        <p className="techs__item">mongoDB</p>
      </div>
    </div>
  )
}

export default Techs
