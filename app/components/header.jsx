import { useState } from "react";
import "./headerDesign.css"; // ヘッダー専用のCSSを適用

const Header = (props) => {
  const { nowTurn } = props;

  return (
    <header className="header-container">
      <button className="header-button" id="return">
        戻る
      </button>
      <div className="header-title"> 　　Climatic Clash</div>
      <div className="header-turn">経過ターン : {nowTurn}</div>
      <button className="header-button" id="rule">
        ルール説明
      </button>
    </header>
  );
};

export default Header;
