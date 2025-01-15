import { useState, useEffect } from "react";
const Player1 = (props) => {
  const { currentP1Card, nowP1Attack, setNowP1Decide, P1HP } = props;
  const [P1Name, setP1Name] = useState("プレイヤー1"); //F
  const [P1StateText, setP1StateText] = useState("攻撃");
  useEffect(() => {
    if (nowP1Attack) {
      setP1StateText("攻撃");
    } else {
      setP1StateText("防御");
    }
  }, [nowP1Attack]);
  return (
    <div
      className="P1Box"
      style={{
        width: "300px",
        height: "200px",
        position: "absolute",
        left: "100px",
      }}
    >
      <div className="playerName" style={{ margin: "10px", width: "300px" }}>
        P1.name : {P1Name}
      </div>
      <div className="AttackOrDefence" style={{ margin: "10px" }}>
        {P1StateText}
      </div>
      <div className="playerHP" style={{ margin: "10px" }}>
        P1.HP : {P1HP}
      </div>
      <div
        className="playerCardName"
        style={{ margin: "10px", width: "300px" }}
      >
        P1.cardName : {currentP1Card.name}
      </div>
      <button
        className="decide"
        onClick={() => {
          setNowP1Decide(true);
        }}
        style={{ margin: "10px" }}
      >
        決定
      </button>
    </div>
  );
};

export default Player1;
