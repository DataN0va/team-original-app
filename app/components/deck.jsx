import { useState, useEffect } from "react";
import deckArray from "../components/weatherInfo.js";
import "./buttonDesign.css"; // カスタムCSSを適用する

const Deck = (props) => {
  const { setCurrentP1Card, setNowP1Decide } = props;

  // ランダムにカードを選択する関数
  const getRandomCards = () => {
    const shuffledDeck = [...deckArray].sort(() => Math.random() - 0.5); // デッキをシャッフル
    return shuffledDeck.slice(0, 4); // 最初の4枚を選択
  };

  const [cards, setCards] = useState([]);

  // 初期化時にランダムなカードを設定
  useEffect(() => {
    setCards(getRandomCards());
  }, []);

  // カードの再抽選関数
  const redrawCards = () => {
    setCards(getRandomCards());
  };

  return (
    <div id="cardBox">
      <div className="card-row">
        {cards.map((card, index) => (
          <button
            key={index}
            className="custom-card-button"
            onClick={() => setCurrentP1Card(card)}
          >
            <img src={card.img} alt={card.name} />
            <span>{card.name}</span>
          </button>
        ))}
      </div>
      <button
        className="decide"
        onClick={() => {
          setNowP1Decide((prevState) => !prevState); // プレイヤーのターン終了をトグル
          redrawCards(); // 新しいカードを抽選
        }}
      >
        決定
      </button>
    </div>
  );
};

export default Deck;
