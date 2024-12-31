import React from "react";
import deckArray from "./weatherInfo.js";
const Battle = (props) => {
  const { currentP1Card, currentP2Card } = props;
  return (
    <div>
      <div id="P1Card">
        <div className="cardName">P1.name : {currentP1Card.name} </div>
        <div className="APIIndex">
          <div className="weather">P1.weather : {currentP1Card.weather} </div>
          <div className="temperature">
            P1.temp : {currentP1Card.temp - 273.15}
          </div>
        </div>
        <div className="lastStatus">P1.lastStatus : </div>
      </div>
      <div id="attuckerOrDefender"></div>
      <div id="P2Card">
        <div className="cardName">P2.name : {currentP2Card.name}</div>
        <div className="APIIndex">
          <div className="weather">P2.weather : {currentP2Card.weather}</div>
          <div className="temperature">
            P2.temp : {currentP2Card.temp - 273.15}
          </div>
        </div>
        <div className="lastStatus">P2.lastStatus :</div>
      </div>
    </div>
  );
};

export default Battle;
