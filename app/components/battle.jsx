import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { updateDoc, doc } from "firebase/firestore";
import "./Battle.css";

// 国コードを日本語に変換するマッピング
const toJapaneseList = {
  JP: "日本",
  CA: "カナダ",
  CO: "コロンビア",
  IR: "イラン",
  KE: "ケニア",
  DE: "ドイツ",
  TR: "トルコ",
  SE: "スウェーデン",
  SA: "サウジアラビア",
  FR: "フランス",
  NG: "ナイジェリア",
  MA: "モロッコ",
  BR: "ブラジル",
  EG: "エジプト",
  IL: "イスラエル",
  AR: "アルゼンチン",
  PH: "フィリピン",
  NZ: "ニュージーランド",
  RU: "ロシア",
  US: "アメリカ",
  ID: "インドネシア",
  TH: "タイ",
  AU: "オーストラリア",
  PK: "パキスタン",
  PL: "ポーランド",
  AE: "アラブ首長国連邦",
  MX: "メキシコ",
  ES: "スペイン",
  CL: "チリ",
  CN: "中国",
  MY: "マレーシア",
  KR: "韓国",
  IT: "イタリア",
  GR: "ギリシャ",
  NL: "オランダ",
  SG: "シンガポール",
  EC: "エクアドル",
  IN: "インド",
  GB: "イギリス",
  BD: "バングラデシュ",
};

// 天候を日本語に変換するマッピング
const weatherToJapaneseList = {
  Clouds: "曇り",
  Drizzle: "霧雨",
  Rain: "雨",
  Snow: "雪",
  Clear: "晴れ",
  Thunderstorm: "雷雨",
  Mist: "霧",
  Smoke: "煙",
  Haze: "もや",
  Dust: "埃",
  Ash: "火山灰",
  Squall: "スコール",
  Tornado: "竜巻",
};

// 国名を日本語に変換する関数
const getJapaneseName = (countryCode) =>
  toJapaneseList[countryCode] || countryCode;

// 天候を日本語に変換する関数
const getJapaneseWeather = (weather) =>
  weatherToJapaneseList[weather] || weather;

// 国旗のURLを取得する関数
const getFlagUrl = (countryCode) =>
  `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

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

  const initialCardState = { name: "", temp: 273.15, weather: "" };

  const weatherEvent = (prevHP, decidedAttackCard, decidedDefenceCard) => {
    const weatherDamageMap = {
      Clouds: 5,
      Drizzle: 7,
      Rain: 10,
      Snow: 12,
      Clear: 8,
      Thunderstorm: 15,
      Mist: 4,
      Smoke: 4,
      Haze: 4,
      Dust: 4,
      Ash: 4,
      Squall: 6,
      Tornado: 20,
    };
    const temperatureEffect = (temp) =>
      temp < 0 ? -5 : temp > 30 ? -3 : temp > 15 ? 5 : 2;
    let damage = weatherDamageMap[decidedAttackCard.weather] || 0;
    damage += temperatureEffect(decidedAttackCard.temp - 273.15);
    const defenceEffect = weatherDamageMap[decidedDefenceCard.weather] || 0;
    return Math.max(0, prevHP - Math.max(0, damage - defenceEffect / 2));
  };

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

        setNowTurn((prevState) => prevState + 1);

        const secondDelay = setTimeout(() => {
          updateDoc(doc(db, "rooms", room), {
            P1Card: { ...initialCardState },
            P2Card: { ...initialCardState },
          });
        }, 500);

        return () => clearTimeout(secondDelay);
      }, 500);

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
        setNowTurn((prevState) => prevState + 1);

        const secondDelay = setTimeout(() => {
          updateDoc(doc(db, "rooms", room), {
            P1Card: { ...initialCardState },
            P2Card: { ...initialCardState },
          });
        }, 500);

        return () => clearTimeout(secondDelay);
      }, 500);

      return () => clearTimeout(firstDelay);
    }
  }, [decidedP2Card]);

  const attackerOrDefender = () =>
    nowP1Attack ? "プレイヤー１" : "プレイヤー２";

  return (
    <div className="battle-container">
      <div className="card">
        <h3>プレイヤー1のカード</h3>
        {decidedP1Card.name && (
          <img src={getFlagUrl(decidedP1Card.name)} alt={decidedP1Card.name} />
        )}
        <p>{getJapaneseName(decidedP1Card.name) || "未選択"}</p>
        <p>{getJapaneseWeather(decidedP1Card.weather) || ""}</p>
        <p>
          {decidedP1Card.temp
            ? `${(decidedP1Card.temp - 273.15).toFixed(1)} °C`
            : ""}
        </p>
      </div>

      <div className="attacker-indicator">攻撃: {attackerOrDefender()}</div>

      <div className="card">
        <h3>プレイヤー2のカード</h3>
        {decidedP2Card.name && (
          <img src={getFlagUrl(decidedP2Card.name)} alt={decidedP2Card.name} />
        )}
        <p>{getJapaneseName(decidedP2Card.name) || "未選択"}</p>
        <p>{getJapaneseWeather(decidedP2Card.weather) || ""}</p>
        <p>
          {decidedP2Card.temp
            ? `${(decidedP2Card.temp - 273.15).toFixed(1)} °C`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Battle;
