import { useState } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/header.jsx";
import Player1 from "../components/player1.jsx";
import Player2 from "../components/player2.jsx";
import Battle from "../components/battle.jsx";
export default function Fightpage() {
  const [currentP1Card, setCurrentP1Card] = useState({});
  const [currentP2Card, setCurrentP2Card] = useState({});
  // const [currentDefenceCard, setCurrentDefenceCard] = useState({});
  return (
    <>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <Player1 currentP1Card={currentP1Card} />
        <Battle currentP1Card={currentP1Card} currentP2Card={currentP2Card} />
        <Player2
          currentP2Card={currentP2Card}
          setCurrentP2Card={setCurrentP2Card}
        />
      </div>
      <Deck setCurrentP1Card={setCurrentP1Card} />
    </>
  );
}
