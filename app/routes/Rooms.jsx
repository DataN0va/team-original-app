import { useState } from "react";

function Rooms() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  return (
    <>
      <div>
        <h3>部屋を作る</h3>
        <input
          type="text"
          value={value1}
          onInput={(e) => {
            setValue1(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>部屋に入る</h3>
        <input
          type="text"
          value={value2}
          onInput={(e) => {
            setValue2(e.target.value);
          }}
        />
      </div>
      <div>
        <h4>ルール説明はこちらから：</h4>
      </div>
    </>
  );
}

export default Rooms;
