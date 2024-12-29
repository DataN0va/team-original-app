import React from "react";
import deckArray from "./weatherInfo.js";
const Battle = (props) => {
  const { currentAttackCard } = props;
  return (
    <div>
      <div id="P1Card">
        <div className="cardName">{currentAttackCard.name} </div>
        <div className="APIIndex">
          <div className="weather">{currentAttackCard.weather} </div>
          <div className="temperature">{currentAttackCard.temp - 273.15}</div>
        </div>
        <div className="lastStatus"></div>
      </div>
      <div id="attuckerOrDefender"></div>
      <div id="P1Card">
        <div className="cardName"></div>
        <div className="APIIndex">
          <div className="weather"></div>
          <div className="temperature"></div>
        </div>
        <div className="lastStatus"></div>
      </div>
    </div>
  );
};

export default Battle;
