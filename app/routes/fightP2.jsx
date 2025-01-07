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
  const [currentP1Card, setCurrentP1Card] = useState({ name: "", temp: 0 });
  const [currentP2Card, setCurrentP2Card] = useState({ name: "", temp: 0 });
  const [nowTurn, setNowTurn] = useState(0);
  const [P2HP, setP2HP] = useState(100); //F
  const [P1HP, setP1HP] = useState(100); //F
  const [nowP1Attack, setNowP1Attack] = useState(true);
  const [nowP1Decide, setNowP1Decide] = useState(false); //F
  const [nowP2Decide, setNowP2Decide] = useState(false); //F
  const [nowPlayer, setNowPlayer] = useState("プレイヤー１");
  const [room, setRoom] = useState(JSON.parse(localStorage.pass));
  const [battlerooms, setBattlerooms] = useState([]);
  // const [currentDefenceCard, setCurrentDefenceCard] = useState({});
  useEffect(() => {
    setNowPlayer("プレイヤー２");
  }, [setNowP1Decide]);
  useEffect(() => {
    setNowPlayer("プレイヤー１");
  }, [setNowP2Decide]);

  const roomlist = onSnapshot(collection(db, "rooms"), (snapshot) => {
    const newroom = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...room,
    }));
    setBattlerooms(newroom);
  });

  function calculateDamage() {
    roomlist;

    setNowP2Decide(true);
    setCurrentP2Card({ name: currentP2Card.name, temp: currentP2Card.temp });
    getDocs(collection(db, "rooms")).then(() => {
      const battlesituation = doc(collection(db, "rooms"));
      for (let i = 0; i < battlerooms.length; ++i) {
        if (room.password == battlerooms[i].password) {
          updateDoc(battlesituation, {
            nowP2Decide: { nowP2Decide },
            currentP2Card: { currentP2Card },
          });
        }
      }
    });
  }

  useEffect(() => {
    console.log("現在の攻撃カード:", currentP1Card);
    console.log("現在の防御カード:", currentP2Card);

    const calculatedDamage = Math.max(
      0,
      currentP1Card.temp - currentP2Card.temp
    );
    console.log("計算されたダメージ:", calculatedDamage);

    if (nowP1Attack) {
      console.log("プレイヤー1が攻撃中");
      const newHP = Math.max(0, P2HP - calculatedDamage);
      console.log("プレイヤー2の新しいHP:", newHP);
      setP2HP(newHP);
    } else {
      console.log("プレイヤー2が攻撃中");
      const newHP = Math.max(0, P1HP - calculatedDamage);
      console.log("プレイヤー1の新しいHP:", newHP);
      setP1HP(newHP);
    }

    setNowP1Attack((prev) => !prev);
    setNowTurn((prev) => prev + 1);
  }, [nowP1Decide, nowP2Decide]);

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
        <button
          onClick={() => {
            calculateDamage();
          }}
        >
          確定
        </button>
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
