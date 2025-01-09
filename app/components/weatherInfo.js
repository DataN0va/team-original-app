import Deck from "../components/deck.js";
const apiKey = "f06f726cf5190bcb1df57391ed6fd1d6";
const cityList = [
  1850147 /*JP*/, 2988507 /*FRフランス*/, 4138106 /*US*/, 6094817 /*CAカナダ*/,
  3530597 /*MX*/, 3469058 /*BR*/, 3435910 /*ARアルゼンチン*/,
  3688689 /*COコロンビア*/, 3871336 /*CLチリ*/, 2643743 /*GBイギリス*/,
  7290255 /*DEドイツ*/, 3169070 /*ITイタリア*/, 6359304 /*ESスペイン*/,
  524901 /*RUロシア*/, 2673730 /*SEスウェーデン*/, 756135 /*PLポーランド*/,
  360630 /*EGエジプト*/, 1816670 /*CN中国*/, 2352778 /*NGナイジェリア*/,
  184745 /*KEケニア*/, 2538475 /*MAモロッコ*/, 1261481 /*INインド*/,
  1835848 /*KR韓国*/, 108410 /*SAサウジアラビア*/, 1609350 /*THタイ*/,
  323786 /*TRトルコ*/, 2172517 /*AUオーストラリア*/,
  2179537 /*NZニュージーランド*/, 281184 /*ILイスラエル*/, 112931 /*IRイラン*/,
  292968 /*AEアラブ首長国連邦*/, 1880251 /*SGシンガポール*/,
  1733046 /*MYマレーシア*/, 1176615 /*PKパキスタン*/, 1701668 /*PHフィリピン*/,
  1337178 /*BDバングラデシュ*/, 2759794 /*NLオランダ*/, 264371 /*GRギリシャ*/,
  1642911 /*IDインドネシア*/, 3652462 /*ECエクアドル*/,
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
  KR: "flags/flag-korea.png",
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
  const fetchPromises = cityList.map((cityId, i) => {
    const url = urlHead + cityList[i] + `&appid=` + apiKey;
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        deckArray[i].temp = data.main.temp;
        deckArray[i].name = data.sys.country;
        deckArray[i].weather = data.weather[0].main;
        deckArray[i].img = imageNames[data.sys.country];
      });
  });
  await Promise.all(fetchPromises);
  const replacedData = deckArray.map((item) => ({
    ...item,
    name: toJapaneseList[item.name] || item.name, // 対応表にない場合は元の値を使う
  }));

  console.log(replacedData);
  return replacedData;
};
console.log(fetchData());
export default deckArray;
