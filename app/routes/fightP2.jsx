import { useState, useEffect } from "react";
import Deckp2 from "../components/deckp2.jsx";
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
  const room = JSON.parse(localStorage.pass);
  const initialCardState = {
    name: "",
    temp: 273.15,
    weather: "",
  };
  const [currentP1Card, setCurrentP1Card] = useState(initialCardState);
  const [currentP2Card, setCurrentP2Card] = useState(initialCardState);
  const [decidedP1Card, setDecidedP1Card] = useState(initialCardState); //F
  const [decidedP2Card, setDecidedP2Card] = useState(initialCardState); //F
  // const [currentDefenceCard, setCurrentDefenceCard] = useState({});
  useEffect(() => {
    updateDoc(doc(db, "rooms", room), {
      P2Card: { ...currentP2Card }, // currentP1Cardの内容を展開して保存
    });
  }, [nowP2Decide]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", room), (doc) => {
      console.log("Current data: ", doc.data());
      const newP1Card = doc.data()?.P1Card;

      // ステートが実際に変更される場合のみ更新
      setDecidedP1Card((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newP1Card)) {
          return newP1Card;
        }
        return prev; // 変更がない場合は前の値をそのまま保持
      });
    });

    // クリーンアップ関数を返すことでリスナーを解除
    return () => {
      unsub();
    };
  }, [room]);
  return (
    <main
      style={{
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage: `url("/app/components/images/930537.jpg")`,
        paddingTop: "0px", // 上部に余白を追加
      }}
    >
      <Header nowTurn={nowTurn} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // 要素を均等に配置
          alignItems: "center", // 垂直方向に中央揃え
          padding: "20px", // 外側の余白
          //backgroundColor: "#ecf0f1", // 背景色
          borderRadius: "10px", // 角丸
          //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 軽い影を追加
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
          //setNowP1Decide={setNowP1Decide}
          //setNowP2Decide={setNowP2Decide}
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
        />
      </div>
      <Deckp2
        setCurrentP2Card={setCurrentP2Card}
        setNowP2Decide={setNowP2Decide}
      />
      {/*以降デバッグ用*/}
      <div>今の操作 : {nowPlayer}</div>
    </main>
  );
}
