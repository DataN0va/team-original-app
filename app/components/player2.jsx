import { useState, useEffect } from "react";
//ここでは仮のカードとしてdeckArrayから直接カードを入れておく、最終的に消す
const Player2 = (props) => {
  const { currentP2Card, nowP1Attack, setNowP2Decide, P2HP } = props;
  const [P2Name, setP2Name] = useState("プレイヤー２"); //F
  const [P2StateText, setP2StateText] = useState("防御");
  useEffect(() => {
    if (nowP1Attack) {
      setP2StateText("防御");
    } else {
      setP2StateText("攻撃");
    }
  }, [nowP1Attack]);
  return (
    <div className="P2Box">
      <div className="playerName">P2.name : {P2Name}</div>
      <div className="AttackOrDefence">{P2StateText}</div>
      <div className="playerHP">P2.HP : {P2HP}</div>
      <div className="playerCardName">P2.cardName : {currentP2Card.name}</div>
      <button
        className="decide"
        onClick={() => {
          setNowP2Decide((prevState) => !prevState);
        }}
      >
        決定
      </button>
    </div>
  );
};

export default Player2;
