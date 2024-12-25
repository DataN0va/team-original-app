import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function Top() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  return (
    <main>
      <h1>名前を入力↓</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem("name", name), navigate("/rooms");
            //console.log(nameContainer());
          }}
        >
          ログイン
        </button>
      </div>
    </main>
  );
}

export function nameContainer() {
  return localStorage.getItem("name");
}
