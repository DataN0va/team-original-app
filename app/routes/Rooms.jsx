import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

function Rooms() {
  const [name, setName] = useState(JSON.parse(localStorage.nameContainer));
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [passes, setPasses] = useState([]);
  const navigate = useNavigate();

  const pass = {
    user: { name },
    password: { value1 },
    players: [name],
  };

  function handleClickHost() {
    addDoc(collection(db, "passes"), pass).then((ref) => {
      const newPasses = [...passes];
      newPasses.push({
        id: ref.id,
        ...pass,
      });
      setPasses(newPasses);
    });
    localStorage.pass = pass;
    navigate("/routes/Host.jsx");
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
        <button onClick={navigate("./explanation.jsx")}>
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
