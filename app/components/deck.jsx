import { useState } from "react";
import fetchData from "../components/weatherInfo.js";
import "./buttonDesign.css"; // カスタムCSSを適用する

const Deck = (props) => {
  const [card1, setCard1] = useState(fetchData[0]);
  const [card2, setCard2] = useState(fetchData[1]);
  const [card3, setCard3] = useState(fetchData[2]);
  const [card4, setCard4] = useState(fetchData[3]);
  const [card5, setCard5] = useState(fetchData[5]); // デバッグ用
  const [card6, setCard6] = useState(fetchData[6]); // デバッグ用
  const [card7, setCard7] = useState(fetchData[7]); // デバッグ用
  const [card8, setCard8] = useState(fetchData[8]); // デバッグ用
  const { setCurrentP1Card, setCurrentP2Card } = props;

  return (
    <div id="cardBox">
      <div className="card-row">
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card1)}
        >
          <img src={card1.image} alt={card1.name} />
          <span>{card1.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card2)}
        >
          <img src={card2.image} alt={card2.name} />
          <span>{card2.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card3)}
        >
          <img src={card3.image} alt={card3.name} />
          <span>{card3.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card4)}
        >
          <img src={card4.image} alt={card4.name} />
          <span>{card4.name}</span>
        </button>
      </div>
      <div>デバッグ用P2CardBox</div>
      <div className="card-row">
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card5)}
        >
          <img src={card5.image} alt={card5.name} />
          <span>{card5.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card6)}
        >
          <img src={card6.image} alt={card6.name} />
          <span>{card6.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card7)}
        >
          <img src={card7.image} alt={card7.name} />
          <span>{card7.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP2Card(card8)}
        >
          <img src={card8.image} alt={card8.name} />
          <span>{card8.name}</span>
        </button>
      </div>
    </div>
  );
};

export default Deck;
