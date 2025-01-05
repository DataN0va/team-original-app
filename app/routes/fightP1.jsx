import { useState, useEffect } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/header.jsx";
import Player1 from "../components/player1.jsx";
import Player2 from "../components/player2.jsx";
import Battle from "../components/battle.jsx";
export default function Fightpage() {
  const [currentP1Card, setCurrentP1Card] = useState({});
  const [currentP2Card, setCurrentP2Card] = useState({});
  const [nowTurn, setNowTurn] = useState(0);
  const [P2HP, setP2HP] = useState(100); //F
  const [P1HP, setP1HP] = useState(100); //F
  const [nowP1Attack, setNowP1Attack] = useState(true);
  const [nowP1Decide, setNowP1Decide] = useState(false); //F
  const [nowP2Decide, setNowP2Decide] = useState(false); //F
  const [nowPlayer, setNowPlayer] = useState("プレイヤー１");
  // const [currentDefenceCard, setCurrentDefenceCard] = useState({});
  useEffect(() => {
    setNowPlayer("プレイヤー２");
  }, [setNowP1Decide]);
  useEffect(() => {
    setNowPlayer("プレイヤー１");
  }, [setNowP2Decide]);
  return (
    <>
      <Header nowTurn={nowTurn} />
      <div style={{ display: "flex" }}>
        <Player1
          currentP1Card={currentP1Card}
          nowP1Attack={nowP1Attack}
          setNowP1Decide={setNowP1Decide}
          P1HP={P1HP}
        />
        <Battle
          currentP1Card={currentP1Card}
          currentP2Card={currentP2Card}
          nowP1Decide={nowP1Decide}
          nowP2Decide={nowP2Decide}
          setP2HP={setP2HP}
          setP1HP={setP1HP}
          setNowP1Attack={setNowP1Attack}
          //setNowP1Decide={setNowP1Decide}
          //setNowP2Decide={setNowP2Decide}
          nowP1Attack={nowP1Attack}
          setNowPlayer={setNowPlayer}
        />
        <Player2
          currentP2Card={currentP2Card}
          nowP1Attack={nowP1Attack}
          nowP2Decide={nowP2Decide}
          P2HP={P2HP}
          setNowP2Decide={setNowP2Decide}
        />
      </div>
      <Deck
        setCurrentP1Card={setCurrentP1Card}
        setCurrentP2Card={setCurrentP2Card}
      />
      {/*以降デバッグ用*/}
      <div>デバッグ</div>
      <button onClick={() => setNowP1Attack((prevState) => !prevState)}>
        attakerchange
      </button>
      <div>今の操作 : {nowPlayer}</div>
    </>
  );
}
