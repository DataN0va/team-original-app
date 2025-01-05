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
    const roomlist = onSnapshot(collection(db, "passes"), (snapshot) => {
      const newPasses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...pass,
      }));
      setPasses(newPasses);
    });

    return () => roomlist();
  }, []);

  function handleClickHost() {
    addDoc(collection(db, "passes"), pass).then(() => {
      navigate("/Host");
    });
    localStorage.pass = JSON.stringify(pass);
  }

  function handleClickEntrant() {
    getDocs(collection(db, "passes"));
    for (let i = 0; i < passes.length; i++) {
      if (value2 == passes[i].password) {
        updateDoc(doc(db, "passes"), {
          players: arrayUnion(name),
        });
        navigate("/routes/fight2.jsx");
      }
    }
  }

  return (
    <>
      <div>
        <h3>部屋を作る</h3>
        <input
          type="text"
          value={value1}
          onInput={(e) => {
            setValue1(e.target.value);
          }}
        />
        <button onClick={handleClickHost}>作成</button>
      </div>
      <div>
        <h3>部屋に入る</h3>
        <input
          type="text"
          value={value2}
          onInput={(e) => {
            setValue2(e.target.value);
          }}
        />
        <button onClick={handleClickEntrant}>入室</button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("./explanation.jsx");
          }}
        >
          ルール説明はこちらから
        </button>
      </div>
    </>
  );
}

export default Rooms;
export function passObject() {
  return;
}
