import { Link } from "@remix-run/react";
import { useState } from "react";

<Link to="/rooms">部屋一覧</Link>;
export default function Top() {
  const [name, setName] = useState("");
  return (
    <main>
      <h1>名前を入力↓</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <button onClick={() => localStorage.setItem("name", name)}>
          ログイン
        </button>
      </div>
    </main>
  );
}
