import { useState } from "react";
import deckArray from "../components/weatherInfo.js";
import "./buttonDesign.css"; // カスタムCSSを適用する

const Deck = (props) => {
  const [card1, setCard1] = useState(deckArray[0]);
  const [card2, setCard2] = useState(deckArray[1]);
  const [card3, setCard3] = useState(deckArray[2]);
  const [card4, setCard4] = useState(deckArray[3]);
  const { setCurrentP1Card, setNowP1Decide } = props;

  return (
    <div
      id="cardBox"
      style={{
        width: "300px",
        position: "absolute",
        top: "400px",
        left: "490px",
      }}
    >
      <div className="card-row">
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card1)}
        >
          <img src={card1.img} alt={card1.name} />
          <span>{card1.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card2)}
        >
          <img src={card2.img} alt={card2.name} />
          <span>{card2.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card3)}
        >
          <img src={card3.img} alt={card3.name} />
          <span>{card3.name}</span>
        </button>
        <button
          className="custom-card-button"
          onClick={() => setCurrentP1Card(card4)}
        >
          <img src={card4.img} alt={card4.name} />
          <span>{card4.name}</span>
        </button>
      </div>
      <button
        className="decide"
        onClick={() => {
          setNowP1Decide((prevState) => !prevState);
        }}
      >
        決定
      </button>
    </div>
  );
};

export default Deck;
