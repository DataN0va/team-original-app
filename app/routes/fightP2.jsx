import { useState } from "react";
export default function Fightpage() {
  const nameP1 = "プレイヤー１";
  const nameP2 = "プレイヤー２";
  const [nowPlayer, setNowPlayer] = useState(true);
  // const [yourState, setYourState] = useState(true);
  const [nowTurn, setNowTurn] = useState(0);
  const [player1HP, setPlayer1HP] = useState(10);
  const [player2HP, setPlayer2HP] = useState(10);
  //今後プレイヤーの情報は１つの配列にまとめる
  const [currentAttackCard, setCurrentAttackCard] = useState(0);
  const [currentDefenceCard, setCurrentDefenceCard] = useState(0);

  function calculateDamage() {
    console.log("現在の攻撃カード:", currentAttackCard);
    console.log("現在の防御カード:", currentDefenceCard);

    const calculatedDamage = Math.max(
      0,
      currentAttackCard - currentDefenceCard
    );
    console.log("計算されたダメージ:", calculatedDamage);

    if (nowPlayer) {
      console.log("プレイヤー1が攻撃中");
      const newHP = Math.max(0, player2HP - calculatedDamage);
      console.log("プレイヤー2の新しいHP:", newHP);
      setPlayer2HP(newHP);
    } else {
      console.log("プレイヤー2が攻撃中");
      const newHP = Math.max(0, player1HP - calculatedDamage);
      console.log("プレイヤー1の新しいHP:", newHP);
      setPlayer1HP(newHP);
    }

    setNowPlayer((prev) => !prev);
    setNowTurn((prev) => prev + 1);
  }

  return (
    <>
      <header>
        <button>戻る</button> 経過ターン : {nowTurn} <button>ルール</button>
      </header>
      <div>senntou</div>
      {/*hedderコンポーネントを作った時にはにページを戻るボタン、ターン経過数、ルール説明ボタンを乗せる*/}
      {/*今後プレイヤーコンポーネントに置き換える*/}
      <div id="nowAttackerPlayerContainer">
        <div id="playerName">{nameP1}</div>
        <div id="HP">HP: {player1HP}</div>
        <div id="playerACard">{currentAttackCard}</div>
      </div>
      <div id="nowDefenderPlayerContainer">
        <div id="playerName">{nameP2}</div>
        <div id="HP">HP: {player2HP}</div>
        <div id="playerDCard">{currentDefenceCard}</div>
      </div>
      <div id="deck">
        {/*今後デッキコンポーネントに置き換える*/}
        <div id="Attackdeck">
          あなたの攻撃カード
          <button
            className="cards"
            id="card1"
            onClick={() => setCurrentAttackCard(1)}
          >
            1
          </button>
          <button
            className="cards"
            id="card2"
            onClick={() => setCurrentAttackCard(2)}
          >
            2
          </button>
          <button
            className="cards"
            id="card3"
            onClick={() => setCurrentAttackCard(3)}
          >
            3
          </button>
        </div>
        <div id="defencedeck">
          あなたの防御カード
          <button
            className="cards"
            id="card1"
            onClick={() => setCurrentDefenceCard(1)}
          >
            1
          </button>
          <button
            className="cards"
            id="card2"
            onClick={() => setCurrentDefenceCard(2)}
          >
            2
          </button>
          <button
            className="cards"
            id="card3"
            onClick={() => setCurrentDefenceCard(3)}
          >
            3
          </button>
        </div>
      </div>
      <button id="Confirmed" onClick={() => calculateDamage()}>
        確定
      </button>
    </>
  );
}
