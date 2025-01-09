import { useState } from "react";
import deckArray from "../components/weatherInfo.js";
import "./buttonDesign.css"; // カスタムCSSを適用する

const Deckp2 = (props) => {
  const [card5, setCard5] = useState(deckArray[5]); // デバッグ用
  const [card6, setCard6] = useState(deckArray[6]); // デバッグ用
  const [card7, setCard7] = useState(deckArray[7]); // デバッグ用
  const [card8, setCard8] = useState(deckArray[8]); // デバッグ用
  const { setCurrentP2Card } = props;

  return (
    <div id="cardBox">
      <div>デバッグ用P2CardBox</div>
      <div className="card-row">
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card5)}
        >
          <img src={card5.img} alt={card5.name} />
          <span>{card5.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card6)}
        >
          <img src={card6.img} alt={card6.name} />
          <span>{card6.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card7)}
        >
          <img src={card7.img} alt={card7.name} />
          <span>{card7.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card8)}
        >
          <img src={card8.img} alt={card8.name} />
          <span>{card8.name}</span>
        </button>
      </div>
    </div>
  );
};

export default Deckp2;
