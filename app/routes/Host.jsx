import { useNavigate } from "@remix-run/react";
import { useState } from "react";
const Host = () => {
  const [pass, setPass] = useState(JSON.parse(localStorage.pass));
  const navigate = useNavigate();
  if (pass.players.length == 2) {
    navigate("./fight2.jsx");
  }
  return (
    <>
      <div>
        <h1>対戦相手を探しています・・・</h1>
      </div>
    </>
  );
};

export default Host;
