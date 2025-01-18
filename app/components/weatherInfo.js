import Deck from "../components/deck.js";

const apiKey = "f06f726cf5190bcb1df57391ed6fd1d6"; // 環境変数で管理推奨
const cityList = [
  1850147, 2988507, 4138106, 6094817, 3530597, 3469058, 3435910, 3688689,
  3871336, 2643743, 7290255, 3169070, 6359304, 524901, 2673730, 756135, 360630,
  1816670, 2352778, 184745, 2538475, 1261481, 1835848, 108410, 1609350, 323786,
  2172517, 2179537, 281184, 112931, 292968, 1880251, 1733046, 1176615, 1701668,
  1337178, 2759794, 264371, 1642911, 3652462,
];
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
const imageNames = {
  JP: "flags/flag-japan.png",
  CA: "flags/flag-canada.png",
  CO: "flags/flag-colombia.png",
  IR: "flags/flag-iran.png",
  KE: "flags/flag-kenya.png",
  DE: "flags/flag-germany.png",
  TR: "flags/flag-turkey.png",
  SE: "flags/flag-sweden.png",
  SA: "flags/flag-saudi-arabia.png",
  FR: "flags/flag-france.png",
  NG: "flags/flag-nigeria.png",
  MA: "flags/flag-morocco.png",
  BR: "flags/flag-brazil.png",
  EG: "flags/flag-egypt.png",
  IL: "flags/flag-israel.png",
  AR: "flags/flag-argentina.png",
  PH: "flags/flag-philippines.png",
  NZ: "flags/flag-newzealand.png",
  RU: "flags/flag-russia.png",
  US: "flags/flag-america.png",
  ID: "flags/flag-indonesia.png",
  TH: "flags/flag-thailand.png",
  AU: "flags/flag-australia.png",
  PK: "flags/flag-pakistan.png",
  PL: "flags/flag-poland.png",
  AE: "flags/flag-arab.png",
  MX: "flags/flag-mexico.png",
  ES: "flags/flag-spain.png",
  CL: "flags/flag-chile.png",
  CN: "flags/flag-china.png",
  MY: "flags/flag-malaysia.png",
  KR: "flags/flag-south-korea.png",
  IT: "flags/flag-italy.png",
  GR: "flags/flag-greece.png",
  NL: "flags/flag-netherland.png",
  SG: "flags/flag-singapore.png",
  EC: "flags/flag-ecuador.png",
  IN: "flags/flag-india.png",
  GB: "flags/flag-united-kingdom.png",
  BD: "flags/flag-bangladesh.png",
};

const urlHead = `https://api.openweathermap.org/data/2.5/weather?id=`;

let deckArray = Deck();

const fetchData = async () => {
  try {
    // APIリクエストをすべて並列で実行
    const fetchPromises = cityList.map((cityId, i) => {
      const url = `${urlHead}${cityId}&appid=${apiKey}`;
      return fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch data for city ID: ${cityId}`);
          }
          return res.json();
        })
        .then((data) => {
          // データが取得できた場合
          deckArray[i] = {
            temp: data.main?.temp || "N/A",
            name: data.sys?.country || "Unknown",
            weather: data.weather?.[0]?.main || "N/A",
            img: imageNames[data.sys?.country] || "default.png",
          };
        })
        .catch((err) => console.error(err.message));
    });

    await Promise.all(fetchPromises);

    // 日本語に置き換える処理
    const replacedData = deckArray.map((item) => ({
      ...item,
      name: toJapaneseList[item.name] || item.name, // 対応表にない場合は元の値を使う
    }));

    console.log(replacedData); // デバッグ用
    return replacedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

export default deckArray;
