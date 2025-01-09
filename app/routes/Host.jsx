import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";

const Host = () => {
  const [pass, setPass] = useState(JSON.parse(localStorage.pass));
  const navigate = useNavigate();

  useEffect(() => {
    if (pass.players.length === 2) {
      navigate("./fight2.jsx");
    }
  }, [pass.players.length, navigate]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: "0",
          backgroundImage: `url('/app/components/images/930537.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          対戦相手を探しています・・・
        </h1>
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #3498db",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 2s linear infinite",
          }}
        ></div>
        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Host;
