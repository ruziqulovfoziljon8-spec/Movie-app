"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!username || !password) {
      setValidationError("Username va parol kiritish shart!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/dashboard");
      } else {
        setValidationError("Username yoki parol xato!");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-container" style={pageWrapperStyle}>
      <div style={glowOverlayStyle}></div>
      <div className="floating-circle" style={circleStyle}></div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={logoWrapperStyle}>
          <div style={playIconStyle}>
            <div style={playTriangleStyle}></div>
          </div>
          <h2 style={brandNameStyle}>
            PREMIUM<span style={{ color: "#e50914" }}>FILM</span>
          </h2>
        </div>

        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1 style={titleStyle}>Kirish</h1>
          <p style={subtitleStyle}>Sevimli kinolaringiz olamiga qayting</p>
        </div>

        <div style={inputGroupStyle}>
          <div className="input-box">
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Username ni kiriting..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div className="input-box">
            <label style={labelStyle}>Parol</label>
            <input
              type="password"
              placeholder="Parolni kiriting..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {validationError && <div style={errorStyle}>{validationError}</div>}

        <button
          type="submit"
          disabled={loading}
          className="login-button"
          style={{
            ...buttonStyle,
            background: loading
              ? "#333"
              : "linear-gradient(90deg, #e50914 0%, #b20710 100%)",
            boxShadow: loading ? "none" : "0 8px 24px rgba(229, 9, 20, 0.4)",
          }}
        >
          {loading ? "Yuklanmoqda..." : "Tizimga Kirish"}
        </button>

        <div style={footerTextStyle}>Xavfsiz ulanish tasdiqlangan</div>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        * {
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .login-button:hover {
          transform: translateY(-3px);
          filter: brightness(1.2);
        }

        .login-button:active {
          transform: translateY(-1px);
        }

        input:focus {
          border-color: #e50914 !important;
          background-color: rgba(255, 255, 255, 0.07) !important;
          outline: none;
          box-shadow: 0 0 15px rgba(229, 9, 20, 0.1);
        }

        .floating-circle {
          animation: float 8s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -50px); }
        }
      `}</style>
    </div>
  );
}


const pageWrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#0a0a0a",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
};

const glowOverlayStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)",
  zIndex: 0,
};

const circleStyle: React.CSSProperties = {
  position: "absolute",
  width: "400px",
  height: "400px",
  background: "rgba(229, 9, 20, 0.05)",
  borderRadius: "50%",
  top: "10%",
  right: "10%",
  filter: "blur(100px)",
  zIndex: 0,
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px",
  padding: "40px",
  borderRadius: "24px",
  background: "rgba(20, 20, 20, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  position: "relative",
  zIndex: 1,
};

const logoWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
};

const playIconStyle: React.CSSProperties = {
  width: "50px",
  height: "50px",
  background: "#e50914",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
};

const playTriangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderLeft: "15px solid white",
  marginLeft: "4px",
};

const brandNameStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "20px",
  fontWeight: "900",
  letterSpacing: "3px",
  margin: 0,
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#fff",
  margin: "0 0 8px 0",
};

const subtitleStyle: React.CSSProperties = {
  color: "#a0a0a0",
  fontSize: "14px",
  margin: 0,
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const labelStyle: React.CSSProperties = {
  color: "#888",
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "8px",
  display: "block",
  marginLeft: "4px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: "12px",
  backgroundColor: "#222",
  border: "1px solid #333",
  color: "#fff",
  fontSize: "15px",
  transition: "all 0.2s ease-in-out",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const errorStyle: React.CSSProperties = {
  color: "#ff4d4d",
  fontSize: "13px",
  textAlign: "center",
  background: "rgba(255, 77, 77, 0.1)",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 77, 77, 0.2)",
};

const footerTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#444",
  fontSize: "12px",
  marginTop: "10px",
};
