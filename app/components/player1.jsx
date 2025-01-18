import { useState, useEffect } from "react";
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

const Player1 = (props) => {
  const { currentP1Card, nowP1Attack, setNowP1Decide, P1HP } = props;
  const [P1Name, setP1Name] = useState("プレイヤー1");
  const [P1StateText, setP1StateText] = useState("攻撃");

  useEffect(() => {
    setP1StateText(nowP1Attack ? "攻撃" : "防御");
  }, [nowP1Attack]);
  // 国名を日本語に変換する関数
  const getJapaneseName = (countryCode) => {
    return toJapaneseList[countryCode] || countryCode; // 対応表にない場合はそのまま表示
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #3498db",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#ecf0f1",
        width: "200px",
        height: "300px",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          color: "#2c3e50",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        {P1Name}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: nowP1Attack ? "#27ae60" : "#e74c3c",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {P1StateText}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "#34495e",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        HP: {P1HP}
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "#2c3e50",
          backgroundColor: "#bdc3c7",
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center",
          width: "100%",
        }}
      >
        {currentP1Card.name
          ? getJapaneseName(currentP1Card.name)
          : "選択カード"}
      </div>
    </div>
  );
};

export default Player1;
