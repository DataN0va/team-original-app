import Deck from "../components/deck.js";
const apiKey = "f06f726cf5190bcb1df57391ed6fd1d6";
const cityList = [
  1850147 /*JP*/, 2988507 /*FR*/, 4138106 /*US*/, 6094817 /*CA*/,
  3530597 /*MX*/, 3469058 /*BR*/, 3435910 /*AR*/, 3688689 /*BR*/,
  3871336 /*CH*/,
];
const urlHead = `https://api.openweathermap.org/data/2.5/weather?id=`;

let deckArray = Deck();
for (let i = 0; i < cityList.length; i++) {
  const url = urlHead + cityList[i] + `&appid=` + apiKey;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      deckArray[i].temp = data.main.temp;
      deckArray[i].name = data.sys.country;
      deckArray[i].weather = data.weather[0].main;
      console.log(deckArray);
    });
}

export default deckArray;
