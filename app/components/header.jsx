import { useState } from "react";
import "./headerDesign.css"; // ヘッダー専用のCSSを適用
import { useNavigate } from "@remix-run/react";

const Header = (props) => {
  const { nowTurn } = props;
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <button
        className="header-button"
        id="return"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        戻る
      </button>
      <div className="header-title"> 　　Climatic Clash</div>
      <div className="header-turn">経過ターン : {nowTurn}</div>
    </header>
  );
};

export default Header;
