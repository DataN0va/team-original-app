import React from "react";
import { useNavigate } from "@remix-run/react";
import { name } from "./top.jsx";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const Host = () => {
  return (
    <div>
      <h1>対戦相手を探しています・・・</h1>
    </div>
  );
};

export default Host;
