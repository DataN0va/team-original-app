import { useState } from "react";

const Header = (props) => {
  const { nowTurn } = props;
  return (
    <div style={{ height: "50px" }}>
      <button
        id="return"
        style={{
          position: "absolute",
          left: "100px",
        }}
      >
        戻る
      </button>
      <div
        id="nowTurn"
        style={{
          width: "200px",
          height: "26px",
          position: "absolute",
          left: "570px",
        }}
      >
        経過ターン : {nowTurn}
      </div>
      <button
        id="rule"
        style={{
          float: "right",
          position: "absolute",
          left: "1010px",
          height: "26px",
          width: "84px",
        }}
      >
        ルール説明
      </button>
    </div>
  );
};

export default Header;
