import { useState } from "react";

export default function fightpage() {
  const [nowPlayer, setNowPlayer] = useState(true);
  const [yourState, setYourState] = useState(false);
  function useCard() {}
  return (
    <>
      <div id="nowAttackerPlayerContainer">
        <div id="playerName">プレイヤー１</div>
        <div id="playerACard"></div>
      </div>
      <div id="nowDefenderPlayerContainer">
        <div id="playerName">プレイヤー2</div>
        <div id="playerDCard"></div>
      </div>
      <div id="deck">
        あなたのカード
        <button className="cards" id="card1" onClick={() => useCard()}>
          1
        </button>
        <button className="cards" id="card2" onClick={() => useCard()}>
          2
        </button>
        <button className="cards" id="card3" onClick={() => useCard()}>
          3
        </button>
      </div>
    </>
  );
}
