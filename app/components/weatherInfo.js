const apiKey = "f06f726cf5190bcb1df57391ed6fd1d6";
const cityList = [1850147 /*Tokyo*/, 6616851];
const urlHead = `https://api.openweathermap.org/data/2.5/weather?id=`;

for (let i = 0; i < cityList.length; i++) {
  const url = urlHead + cityList[i] + `&appid=` + apiKey;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}
