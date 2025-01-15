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
    <div
      className="P2Box"
      style={{
        width: "300px",
        height: "200px",
        position: "absolute",
        left: "800px",
      }}
    >
      <div className="playerName" style={{ margin: "10px", width: "300px" }}>
        P2.name : {P2Name}
      </div>
      <div className="AttackOrDefence" style={{ margin: "10px" }}>
        {P2StateText}
      </div>
      <div className="playerHP" style={{ margin: "10px" }}>
        P2.HP : {P2HP}
      </div>
      <div
        className="playerCardName"
        style={{ margin: "10px", width: "300px" }}
      >
        P2.cardName : {currentP2Card.name}
      </div>
      <button
        className="decide"
        onClick={() => {
          setNowP2Decide((prevState) => !prevState);
        }}
        style={{ margin: "10px" }}
      >
        決定
      </button>
    </div>
  );
};

export default Player2;
