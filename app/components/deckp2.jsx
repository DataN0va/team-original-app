import { useState, useEffect } from "react";
import deckArray from "../components/weatherInfo.js";
import "./buttonDesign.css"; // カスタムCSSを適用する
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
const Deckp2 = (props) => {
  const { setCurrentP2Card, setNowP2Decide, nowPlayer } = props;

  // ランダムにカードを選択する関数
  const getRandomCards = () => {
    const shuffledDeck = [...deckArray].sort(() => Math.random() - 0.5); // デッキをシャッフル
    return shuffledDeck.slice(0, 4); // 最初の4枚を選択
  };

  const [cards, setCards] = useState([]);

  // 初期化時にランダムなカードを設定
  useEffect(() => {
    setCards(getRandomCards());
  }, []);

  // カードの再抽選関数
  const redrawCards = () => {
    setCards(getRandomCards());
  };

  // 国コードを日本語に変換する関数
  const getJapaneseName = (countryCode) => {
    return toJapaneseList[countryCode] || countryCode; // 対応表にない場合は元の国コードを表示
  };

  // 自分のターンであるかどうかを判定
  const isMyTurn = nowPlayer === 2 || nowPlayer === 3;

  return (
    <div id="cardBox">
      <div className="card-row">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`custom-card-button ${isMyTurn ? "" : "disabled"}`}
            onClick={() => isMyTurn && setCurrentP2Card(card)}
            disabled={!isMyTurn}
          >
            <img src={card.img} alt={card.name} />
            <span>{getJapaneseName(card.name)}</span>
          </button>
        ))}
      </div>
      <button
        className={`decide ${isMyTurn ? "" : "disabled"}`}
        onClick={() => {
          if (isMyTurn) {
            setNowP2Decide((prevState) => !prevState); // プレイヤーのターン終了をトグル
            redrawCards(); // 新しいカードを抽選
          }
        }}
        disabled={!isMyTurn}
      >
        決定
      </button>
    </div>
  );
};

export default Deckp2;
