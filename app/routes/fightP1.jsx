import { useState } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/header.jsx";
import Player from "../components/player.jsx";
import Battle from "../components/battle.jsx";
export default function Fightpage() {
  const [currentAttackCard, setCurrentAttackCard] = useState({});
  // const [currentDefenceCard, setCurrentDefenceCard] = useState({});
  return (
    <>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <Player currentAttackCard={currentAttackCard} />
        <Battle currentAttackCard={currentAttackCard} />
        <Player currentAttackCard={currentAttackCard} />
      </div>
      <Deck setCurrentAttackCard={setCurrentAttackCard} />
    </>
  );
}
