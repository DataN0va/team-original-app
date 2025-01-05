import { useState } from "react";
import deckArray from "./weatherInfo.js";

const Deck = (props) => {
  const [card1, setCard1] = useState(deckArray[0]);
  const [card2, setCard2] = useState(deckArray[1]);
  const [card3, setCard3] = useState(deckArray[2]);
  const [card4, setCard4] = useState(deckArray[3]);
  const [card5, setCard5] = useState(deckArray[5]); //デバッグ
  const [card6, setCard6] = useState(deckArray[6]); //デバッグ
  const [card7, setCard7] = useState(deckArray[7]); //デバッグ
  const [card8, setCard8] = useState(deckArray[8]); //デバッグ
  const { setCurrentP1Card, setCurrentP2Card } = props;
  return (
    <div id="cardBox">
      <button id="card1" onClick={() => setCurrentP1Card(card1)}>
        {card1.name}
      </button>
      <button id="card2" onClick={() => setCurrentP1Card(card2)}>
        {card2.name}
      </button>
      <button id="card3" onClick={() => setCurrentP1Card(card3)}>
        {card3.name}
      </button>
      <button id="card4" onClick={() => setCurrentP1Card(card4)}>
        {card4.name}
      </button>
      <div>デバッグ用P2CardBox</div>
      {/*ここから*/}
      <button id="card1" onClick={() => setCurrentP2Card(card5)}>
        {card5.name}
      </button>
      <button id="card2" onClick={() => setCurrentP2Card(card6)}>
        {card6.name}
      </button>
      <button id="card3" onClick={() => setCurrentP2Card(card7)}>
        {card7.name}
      </button>
      <button id="card4" onClick={() => setCurrentP2Card(card8)}>
        {card8.name}
      </button>
      {/*ここまで*/}
    </div>
  );
};

export default Deck;
