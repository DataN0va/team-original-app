import React, { useState } from "react";
const Player1 = (props) => {
  const { currentP1Card } = props;
  const [P1Name, setP1Name] = useState("プレイヤー1");
  const [P1HP, setP1HP] = useState(100);
  return (
    <div className="P1Box">
      <div className="playerName">P1.name : {P1Name}</div>
      <div className="AttackOrDefence">攻撃</div>
      <div className="playerHP">P1.HP : {P1HP}</div>
      <div className="playerCardName">P1.cardName : {currentP1Card.name}</div>
      <button className="decide">決定</button>
    </div>
  );
};

export default Player1;
