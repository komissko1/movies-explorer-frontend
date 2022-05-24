import React from "react";
import promoLogo from "../../../images/landing-logo.svg";

function Promo() {
  return (
    <div className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img
          className="promo__pic"
          src={promoLogo}
          alt="PromoLogo"
          />
    </div>
  )
}

export default Promo
