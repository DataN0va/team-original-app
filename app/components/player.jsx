import React from "react";

const Player = (props) => {
  const { currentAttackCard } = props;
  return <div>{currentAttackCard.name}</div>;
};

export default Player;
