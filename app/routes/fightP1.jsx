import { useState } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/Header";
import Player from "../components/Player";
import Battle from "../components/Battle";
export default function Fightpage() {
  return (
    <>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <Player></Player>
        <Battle></Battle>
        <Player></Player>
      </div>
      <Deck></Deck>
    </>
  );
}
