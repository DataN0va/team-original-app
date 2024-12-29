import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { name } from "./top.jsx";
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
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [passes, setPasses] = useState([]);
  const navigate = useNavigate();

  function handleClickHost() {
    const pass = {
      user: { name },
      password: { value1 },
      players: [name],
    };
    addDoc(collection(db, "passes"), pass).then((ref) => {
      const newPasses = [...passes];
      newPasses.push({
        id: ref.id,
        ...pass,
      });
      setPasses(newPasses);
    });
    navigate("/routes/Host");
  }

  function handleClickEntrant() {
    getDocs(collection(db, "passes"));
    for (let i = 0; i < passes.length; i++) {
      if (value2 == passes[i].password) {
        updateDoc(doc(db, "passes"), {
          players: arrayUnion(name),
        });
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
        <h4>ルール説明はこちらから：</h4>
      </div>
    </>
  );
}

export default Rooms;
