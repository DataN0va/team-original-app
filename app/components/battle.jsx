import { useState, useEffect } from "react";
const Battle = (props) => {
  const {
    currentP1Card,
    currentP2Card,
    nowP1Decide,
    //setNowP1Decide,
    nowP2Decide,
    //setNowP2Decide,
    setNowPlayer,
    nowP1Attack,
    setP2HP,
    setP1HP,
    setNowP1Attack,
  } = props;
  const initialCardState = {
    name: "",
    temp: 273.15,
    weather: "",
  };

  const [decidedP1Card, setDecidedP1Card] = useState(initialCardState); //F
  const [decidedP2Card, setDecidedP2Card] = useState(initialCardState); //F
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
    if (nowP1Attack !== true) {
      setP1HP((prevHP) => weatherEvent(prevHP, decidedP1Card, decidedP2Card));
      setNowP1Attack((prevState) => !prevState);
      setDecidedP1Card(initialCardState);
      setDecidedP2Card(initialCardState);
      setNowPlayer("プレイヤー１");
    }
  }, [nowP1Decide]);

  useEffect(() => {
    setDecidedP2Card(currentP2Card);
    setNowPlayer("プレイヤー１");
    if (nowP1Attack) {
      setP2HP((prevHP) => weatherEvent(prevHP, decidedP2Card, decidedP1Card));
      setNowP1Attack((prevState) => !prevState);
      setDecidedP1Card(initialCardState);
      setDecidedP2Card(initialCardState);
      setNowPlayer("プレイヤー２");
    }
  }, [nowP2Decide]);
  return (
    <div>
      <div id="P1Card">
        <div className="cardName">P1.name : {decidedP1Card.name} </div>
        <div className="APIIndex">
          <div className="weather">P1.weather : {decidedP1Card.weather} </div>
          <div className="temperature">
            P1.temp : {decidedP1Card.temp - 273.15}
          </div>
        </div>
        <div className="lastStatus">P1.lastStatus : </div>
      </div>
      <div id="attuckerOrDefender"></div>
      <div id="P2Card">
        <div className="cardName">P2.name : {decidedP2Card.name}</div>
        <div className="APIIndex">
          <div className="weather">P2.weather : {decidedP2Card.weather}</div>
          <div className="temperature">
            P2.temp : {decidedP2Card.temp - 273.15}
          </div>
        </div>
        <div className="lastStatus">P2.lastStatus :</div>
      </div>
    </div>
  );
};

export default Battle;
