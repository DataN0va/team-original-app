import { useState, useEffect } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/header.jsx";
import Player1 from "../components/player1.jsx";
import Player2 from "../components/player2.jsx";
import Battle from "../components/battle.jsx";
import { db } from "../firebase.js";
import {
  getDocs,
  updateDoc,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function Fightpage() {
  const [nowTurn, setNowTurn] = useState(0);
  const [P2HP, setP2HP] = useState(100); //F
  const [P1HP, setP1HP] = useState(100); //F
  const [nowP1Attack, setNowP1Attack] = useState(true);
  const [nowP1Decide, setNowP1Decide] = useState(false); //F
  const [nowP2Decide, setNowP2Decide] = useState(false); //F
  const [nowPlayer, setNowPlayer] = useState("プレイヤー１");
  const [gameOver, setGameOver] = useState(false); // ゲーム終了フラグ
  const [winner, setWinner] = useState(""); // 勝利プレイヤー
  const room = JSON.parse(localStorage.value1);
  const initialCardState = {
    name: "",
    temp: 273.15,
    weather: "",
  };
  const [currentP1Card, setCurrentP1Card] = useState(initialCardState);
  const [currentP2Card, setCurrentP2Card] = useState(initialCardState);
  const [decidedP1Card, setDecidedP1Card] = useState(initialCardState); //F
  const [decidedP2Card, setDecidedP2Card] = useState(initialCardState); //F

  useEffect(() => {
    // nowP1Decide が変わるたびに更新処理を実行
    updateDoc(doc(db, "rooms", room), {
      P1Card: { ...currentP1Card },
    });
  }, [nowP1Decide]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", room), (doc) => {
      console.log("Current data: ", doc.data());
      const newP2Card = doc.data()?.P2Card;
      setDecidedP2Card((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newP2Card)) {
          return newP2Card;
        }
        return prev;
      });
    });

    return () => {
      unsub();
    };
  }, [room]);

  // HPが0になったときの処理
  useEffect(() => {
    if (P1HP <= 0 || P2HP <= 0) {
      setGameOver(true);
      setWinner(P1HP <= 0 ? "プレイヤー2" : "プレイヤー1");
    }
  }, [P1HP, P2HP]);

  return (
    <main
      style={{
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "950px",
        backgroundImage: `url("/images/930537.jpg")`,
        paddingTop: "0px",
      }}
    >
      <Header nowTurn={nowTurn} />
      {!gameOver ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Player1
            currentP1Card={currentP1Card}
            nowP1Attack={nowP1Attack}
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
            nowP1Attack={nowP1Attack}
            setNowPlayer={setNowPlayer}
            decidedP1Card={decidedP1Card}
            setDecidedP1Card={setDecidedP1Card}
            decidedP2Card={decidedP2Card}
            setDecidedP2Card={setDecidedP2Card}
            setNowTurn={setNowTurn}
            room={room}
          />
          <Player2
            currentP2Card={currentP2Card}
            nowP1Attack={nowP1Attack}
            P2HP={P2HP}
            setNowP2Decide={setNowP2Decide}
          />
        </div>
      ) : (
        <div style={{ marginTop: "50px", color: "#fff", fontSize: "2rem" }}>
          {winner}が勝利しました！
        </div>
      )}

      {!gameOver && (
        <Deck
          setCurrentP1Card={setCurrentP1Card}
          setNowP1Decide={setNowP1Decide}
        />
      )}
      <div>今の操作 : {nowPlayer}</div>
    </main>
  );
}
