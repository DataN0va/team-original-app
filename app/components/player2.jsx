import { useState, useEffect } from "react";

const Player2 = (props) => {
  const { currentP2Card, nowP1Attack, setNowP2Decide, P2HP } = props;
  const [P2Name, setP2Name] = useState("プレイヤー２");
  const [P2StateText, setP2StateText] = useState("防御");

  useEffect(() => {
    setP2StateText(nowP1Attack ? "防御" : "攻撃");
  }, [nowP1Attack]);

  return (
    <div

      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #3498db",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#ecf0f1",
        width: "200px",
        height: "300px",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          color: "#2c3e50",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        {P2Name}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: nowP1Attack ? "#e74c3c" : "#27ae60",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {P2StateText}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "#34495e",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        HP: {P2HP}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "#2c3e50",
          backgroundColor: "#bdc3c7",
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center",
          width: "100%",
        }}
        style={{ margin: "10px" }}
      >
        {currentP2Card.name || "選択カード"}
      </div>
    </div>
  );
};

export default Player2;
