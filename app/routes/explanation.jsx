import "../components/mergin0.css";
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
  PT: "ポルトガル", // 追加
  VN: "ベトナム", // 追加
  NO: "ノルウェー", // 追加
  DK: "デンマーク", // 追加
  FI: "フィンランド", // 追加
  ZA: "南アフリカ", // 追加
};

const weatherEffects = {
  Clouds: { description: "防御力アップ（+5）", effect: 5 },
  Drizzle: { description: "小さな攻撃力強化（+7）", effect: 7 },
  Rain: { description: "攻撃力中アップ（+10）", effect: 10 },
  Snow: { description: "防御力大アップ（+12）", effect: 12 },
  Clear: { description: "攻撃力大アップ（+8）", effect: 8 },
  Thunderstorm: { description: "特大攻撃力アップ（+15）", effect: 15 },
  Mist: { description: "視界が悪く防御寄り（+4）", effect: 4 },
  Fog: { description: "濃霧でやや防御（+3）", effect: 3 },
  Heatwave: { description: "熱波で特大攻撃（+20）", effect: 20 },
  Blizzard: { description: "猛吹雪で高ダメージ（+18）", effect: 18 },
  Tornado: { description: "竜巻で最大攻撃（+25）", effect: 25 },
};

const Explanation = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        backgroundImage: `url("/images/930537.jpg")`,
        backgroundAttachment: "fixed",
        position: "relative",
        color: "#2c3e50",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          color: "#1e3a8a",
          marginBottom: "30px",
          marginTop: "60px",
          textAlign: "center",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        Climatic Clashへようこそ！
      </h1>

      <section>
        <h2 style={{ color: "#FF5722" }}>🎯 目的と概要</h2>
        <p>
          このゲームの目的は、<strong>相手のHPを0にして勝利</strong>
          することです。カードの強さは<strong>現実の気候データ</strong>
          に基づいており、天候と気温が戦略のカギを握ります。
        </p>
        <ul>
          <li>
            <strong>天気</strong>と<strong>気温</strong>
            が攻撃・防御に影響します。
          </li>
          <li>相手の行動を予測し、最適なカードを選びましょう。</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: "#03A9F4" }}>🌍 ゲームの要素</h2>

        <h3 style={{ color: "#009688" }}>🗺 登場する国々</h3>
        <p>
          世界中の国々がカードとして登場します。それぞれの場所の
          <strong>現実の天候</strong>
          を反映したカードで戦略的に戦いましょう。
        </p>
        <div style={{ columns: 3, columnGap: "20px" }}>
          <ul>
            {Object.values(toJapaneseList).map((country, index) => (
              <li key={index}>{country}</li>
            ))}
          </ul>
        </div>

        <h3 style={{ color: "#673AB7" }}>⛅ 天候と特殊効果</h3>
        <p>
          天候は攻撃や防御力に直接影響します。各天候の特徴を理解し、
          <strong>最大限に活用</strong>
          しましょう！
        </p>
        <ul>
          {Object.entries(weatherEffects).map(([weather, effect], index) => (
            <li key={index}>
              <strong>{weather}:</strong> {effect.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 style={{ color: "#FF5722" }}>🔥 戦略のポイント</h2>
        <p>
          気温の影響を考慮しながら、最適な攻防のカードを選びましょう。気温が
          <strong>0℃以下</strong> なら防御力強化、<strong>30℃以上</strong>
          なら攻撃力が増加します。
        </p>
      </section>
    </div>
  );
};

export default Explanation;
