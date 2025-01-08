import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function Top() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <main
      style={{
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage: `url("/app/components/images/930537.jpg")`,
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#2c3e50", marginBottom: "20px" }}>
        Climatic Clash
      </h1>
      <h2
        style={{ fontSize: "1.5rem", color: "#34495e", marginBottom: "40px" }}
      >
        名前を入力してゲームを始めましょう！
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="あなたの名前を入力"
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #bdc3c7",
            borderRadius: "5px",
            width: "250px",
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem("name", name);
            navigate("/rooms");
          }}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#3498db",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
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
