import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { db } from "../firebase.js";
import { nameContainer } from "./top.jsx";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  onSnapshot,
} from "firebase/firestore";

function Rooms() {
  const [name, setName] = useState(nameContainer);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [passes, setPasses] = useState([]);
  const navigate = useNavigate();

  const pass = {
    user: { name },
    password: { value1 },
    players: [name],
  };

  useEffect(() => {
    const roomlist = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const newPasses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...pass,
      }));
      setPasses(newPasses);
    });

    return () => roomlist();
  }, []);

  function handleClickHost() {
    addDoc(collection(db, "rooms"), pass).then(() => {
      navigate("/Host");
    });
    localStorage.pass = JSON.stringify(pass);
  }

  function handleClickEntrant() {
    getDocs(collection(db, "rooms"));
    for (let i = 0; i < passes.length; i++) {
      if (value2 === passes[i].password.value1) {
        updateDoc(doc(db, "rooms"), {
          players: arrayUnion(name),
        });
        navigate("/routes/fight2.jsx");
      }
    }
  }

  return (
    <main
      style={{
        margin: 0,
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage: `url("/app/components/images/930537.jpg")`,
      }}
    >
      <div style={{ color: "#333", padding: "20px" }}>
        <h3>部屋を作る</h3>
        <input
          type="text"
          value={value1}
          onInput={(e) => {
            setValue1(e.target.value);
          }}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleClickHost}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          作成
        </button>
      </div>
      <div style={{ color: "#333", padding: "20px" }}>
        <h3>部屋に入る</h3>
        <input
          type="text"
          value={value2}
          onInput={(e) => {
            setValue2(e.target.value);
          }}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleClickEntrant}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          入室
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button
          onClick={() => {
            navigate("/explanation");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ルール説明はこちらから
        </button>
      </div>
    </main>
  );
}

export default Rooms;
export function passObject() {
  return;
}
