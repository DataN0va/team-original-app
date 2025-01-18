import { useState, useEffect } from "react";
import Deck from "../components/deck.jsx";
import Header from "../components/header.jsx";
import Player1 from "../components/player1.jsx";
import Player2 from "../components/player2.jsx";
import Battle from "../components/battle.jsx";
import { db } from "../firebase.js";
import { useNavigate } from "@remix-run/react";
import { updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";

export default function Fightpage() {
  const [nowTurn, setNowTurn] = useState(0);
  const [P2HP, setP2HP] = useState(30);
  const [P1HP, setP1HP] = useState(30);
  const [nowP1Attack, setNowP1Attack] = useState(true);
  const [nowP1Decide, setNowP1Decide] = useState(false);
  const [nowP2Decide, setNowP2Decide] = useState(false);
  const [nowPlayer, setNowPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(true); // ローディングフラグ
  const room = JSON.parse(localStorage.value1);
  const initialCardState = {
    name: "",
    temp: 273.15,
    weather: "",
  };
  const [currentP1Card, setCurrentP1Card] = useState(initialCardState);
  const [currentP2Card, setCurrentP2Card] = useState(initialCardState);
  const [decidedP1Card, setDecidedP1Card] = useState(initialCardState);
  const [decidedP2Card, setDecidedP2Card] = useState(initialCardState);
  const navigate = useNavigate();

  useEffect(() => {
    // ローディング表示のための2秒の遅延
    const timer = setTimeout(() => {
      setLoading(false);
      const timer = setTimeout(() => {
        setNowPlayer(1);
      }, 500);
      return () => clearTimeout(timer); // クリーンアップ
    }, 2000);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  useEffect(() => {
    // P1Cardを確定
    setDecidedP1Card(currentP1Card);

    // プレイヤーの更新ロジック
    setNowPlayer((prevState) => {
      const newPlayer = prevState + 1 > 4 ? 1 : prevState + 1; // 1〜4の範囲でローテーション
      return newPlayer;
    });

    // 遅延してFirestoreを更新
    const delay = setTimeout(() => {
      updateDoc(doc(db, "rooms", room), {
        P1Card: { ...currentP1Card },
        nowTurn: nowPlayer + 1 > 4 ? 1 : nowPlayer + 1, // Firestore用にロジックを再計算
      })
        .then(() => console.log("Firestore updated successfully"))
        .catch((error) => console.error("Error updating Firestore:", error));
    }, 100);

    return () => clearTimeout(delay); // クリーンアップ
  }, [nowP1Decide]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", room), (doc) => {
      console.log("Current data: ", doc.data());
      const data = doc.data(); // ドキュメントデータを取得
      if (data) {
        const newP2Card = data.P2Card;
        const newNowTurn = data.nowTurn; // nowTurnを取得

        setNowPlayer(newNowTurn); // nowTurnを更新
        setDecidedP2Card((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(newP2Card)) {
            return newP2Card;
          }
          return prev;
        });
      }
    });

    return () => {
      unsub();
    };
  }, [room]);

  useEffect(() => {
    if (P1HP <= 0 || P2HP <= 0) {
      setGameOver(true);
      setWinner(P1HP <= 0 ? "プレイヤー2" : "プレイヤー1");

      // サーバー上のroomを削除
      const deleteRoom = async () => {
        try {
          await deleteDoc(doc(db, "rooms", room)); // roomドキュメントを削除
          console.log(`Room ${room} deleted successfully.`);
        } catch (error) {
          console.error(`Failed to delete room ${room}:`, error);
        }
      };

      deleteRoom();
    }
  }, [P1HP, P2HP]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9e79f",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #fff",
            borderTop: "5px solid #f39c12",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <div
            style={{
              color: "#4B0082", // 深い藍色（インディゴ）
              fontSize: "3rem", // フォントサイズをさらに大きく
              fontWeight: "bold", // 太字で強調
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // テキストに影を追加
              marginBottom: "30px", // 下に余白を広げる
            }}
          >
            {winner}が勝利しました！
          </div>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            戻る
          </button>
        </div>
      )}

      {!gameOver && (
        <Deck
          setCurrentP1Card={setCurrentP1Card}
          setNowP1Decide={setNowP1Decide}
          nowPlayer={nowPlayer}
        />
      )}
      <div>今の操作 : {nowPlayer}</div>
    </main>
  );
}
