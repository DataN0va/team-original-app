import { useState } from "react";

const Header = (props) => {
  const { nowTurn } = props;
  return (
    <div>
      <button id="return">戻る</button>
      <div id="nowTurn">経過ターン : {nowTurn}</div>
      <button id="rule">ルール説明</button>
    </div>
  );
};

export default Header;
