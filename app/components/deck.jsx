import React, { useState } from "react";
import deckArray from "./weatherInfo.js";

const Deck = (props) => {
  const [card1, setCard1] = useState(deckArray[0]);
  const [card2, setCard2] = useState(deckArray[1]);
  const [card3, setCard3] = useState(deckArray[2]);
  const [card4, setCard4] = useState(deckArray[3]);
  const { setCurrentAttackCard } = props;
  return (
    <div id="cardBox">
      <button id="card1" onClick={() => setCurrentAttackCard(card1)}>
        {card1.name}
      </button>
      <button id="card2" onClick={() => setCurrentAttackCard(card2)}>
        {card2.name}
      </button>
      <button id="card3" onClick={() => setCurrentAttackCard(card3)}>
        {card3.name}
      </button>
      <button id="card4" onClick={() => setCurrentAttackCard(card4)}>
        {card4.name}
      </button>
    </div>
  );
};

export default Deck;
