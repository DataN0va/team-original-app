import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { updateDoc, doc } from "firebase/firestore";

const Battle = (props) => {
  const {
    currentP1Card,
    currentP2Card,
    nowP1Decide,
    nowP2Decide,
    setNowPlayer,
    nowP1Attack,
    setP2HP,
    setP1HP,
    setNowP1Attack,
    decidedP1Card,
    setDecidedP1Card,
    decidedP2Card,
    setDecidedP2Card,
    setNowTurn,
    room,
  } = props;

  const initialCardState = {
    name: "",
    temp: 273.15,
    weather: "",
  };

  function weatherEvent(prevHP, decidedAttackCard, decidedDefenceCard) {
    let defaultDamage = Math.max(0, prevHP - 10);
    const weatherDamageMap = {
      Clouds: 0,
      Drizzle: 1,
      Rain: 2,
      Snow: 3,
      Clear: 4,
      Thunderstorm: 5,
    };
    let additionalDamage = weatherDamageMap[decidedAttackCard.weather] || 0;
    defaultDamage += additionalDamage;
    additionalDamage = weatherDamageMap[decidedDefenceCard.weather] || 0;
    defaultDamage -= additionalDamage;
    return defaultDamage;
  }

  useEffect(() => {
    setDecidedP1Card(currentP1Card);
    setNowPlayer("プレイヤー２");
  }, [nowP1Decide]);

  useEffect(() => {
    setDecidedP2Card(currentP2Card);
    setNowPlayer("プレイヤー１");
  }, [nowP2Decide]);

  useEffect(() => {
    if (
      !nowP1Attack &&
      decidedP1Card.name &&
      JSON.stringify(decidedP1Card) !== JSON.stringify(initialCardState)
    ) {
      const firstDelay = setTimeout(() => {
        setP2HP((prevHP) => weatherEvent(prevHP, decidedP2Card, decidedP1Card));
        setNowP1Attack(true);
        setDecidedP1Card(initialCardState);
        setDecidedP2Card(initialCardState);
        setNowPlayer("プレイヤー２");
        setNowTurn((prevState) => prevState + 1);

        const secondDelay = setTimeout(() => {
          updateDoc(doc(db, "rooms", room), {
            P1Card: { ...initialCardState },
            P2Card: { ...initialCardState },
          });
        }, 1500);

        return () => clearTimeout(secondDelay);
      }, 1000);

      return () => clearTimeout(firstDelay);
    }
  }, [decidedP1Card]);

  useEffect(() => {
    if (
      nowP1Attack &&
      decidedP2Card.name &&
      JSON.stringify(decidedP2Card) !== JSON.stringify(initialCardState)
    ) {
      const firstDelay = setTimeout(() => {
        setP1HP((prevHP) => weatherEvent(prevHP, decidedP1Card, decidedP2Card));
        setNowP1Attack(false);
        setDecidedP1Card(initialCardState);
        setDecidedP2Card(initialCardState);
        setNowPlayer("プレイヤー１");
        setNowTurn((prevState) => prevState + 1);

        const secondDelay = setTimeout(() => {
          updateDoc(doc(db, "rooms", room), {
            P1Card: { ...initialCardState },
            P2Card: { ...initialCardState },
          });
        }, 1500);

        return () => clearTimeout(secondDelay);
      }, 1000);

      return () => clearTimeout(firstDelay);
    }
  }, [decidedP2Card]);

  function attuckerOrDefender() {
    return nowP1Attack ? "P1" : "P2";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ecf0f1",
        padding: "20px",
        borderRadius: "10px",
        border: "2px solid #3498db",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* P1Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#dff9fb",
          padding: "10px",
          borderRadius: "10px",
          width: "30%",
        }}
        id="P1Card"
      >
        <div
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}
        >
          P1.name: {decidedP1Card.name || "未選択"}
        </div>
        <div style={{ marginTop: "10px" }}>
          <div>P1.weather: {decidedP1Card.weather || "N/A"}</div>
          <div>
            P1.temp:{" "}
            {decidedP1Card.temp
              ? (decidedP1Card.temp - 273.15).toFixed(2)
              : "N/A"}{" "}
            °C
          </div>
        </div>
      </div>

      {/* 中央の攻撃状態 */}
      <div
        style={{
          fontSize: "2rem",
          color: "#e74c3c",
          fontWeight: "bold",
          textAlign: "center",
        }}
        id="attuckerOrDefender"
      >
        現在の攻撃: {attuckerOrDefender()}
      </div>

      {/* P2Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#dff9fb",
          padding: "10px",
          borderRadius: "10px",
          width: "30%",
        }}
        id="P2Card"
      >
        <div
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}
        >
          P2.name: {decidedP2Card.name || "未選択"}
        </div>
        <div style={{ marginTop: "10px" }}>
          <div>P2.weather: {decidedP2Card.weather || "N/A"}</div>
          <div>
            P2.temp:{" "}
            {decidedP2Card.temp
              ? (decidedP2Card.temp - 273.15).toFixed(2)
              : "N/A"}{" "}
            °C
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
