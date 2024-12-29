import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { name } from "./top.jsx";
import { pass } from "./Rooms.jsx";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const Host = () => {
  const navigate = useNavigate();
  if (pass.players.length <= 2) {
    navigate;
  }
  return (
    <div>
      <h1>対戦相手を探しています・・・</h1>
    </div>
  );
};

export default Host;
