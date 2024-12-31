import React, { useState } from "react";
import deckArray from "./weatherInfo.js";
//ここでは仮のカードとしてdeckArrayから直接カードを入れておく、最終的に消す
const Player2 = (props) => {
  const { currentP2Card, setCurrentP2Card } = props;
  const [P2Name, setP2Name] = useState("プレイヤー２");
  const [P2HP, setP2HP] = useState(100);
  setCurrentP2Card(deckArray[5]);

  return (
    <div className="P2Box">
      <div className="playerName">P2.name : {P2Name}</div>
      <div className="AttackOrDefence">防御</div>
      <div className="playerHP">P2.HP : {P2HP}</div>
      <div className="playerCardName">P2.cardName : {currentP2Card.name}</div>
      <button className="decide">決定</button>
    </div>
  );
};

export default Player2;
