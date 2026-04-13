"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <form
        onSubmit={handleSubmit}
        style={{
          ...formStyle,
          padding: isMobile ? "30px 20px" : "40px", 
          maxWidth: isMobile ? "100%" : "400px",
        }}
      >
        <div style={logoWrapperStyle}>
          <div style={playIconStyle}>
            <div style={playTriangleStyle}></div>
          </div>
          <h2 style={brandNameStyle}>
            PREMIUM<span style={{ color: "#e50914" }}>FILM</span>
          </h2>
        </div>

        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1 style={{ ...titleStyle, fontSize: isMobile ? "24px" : "28px" }}>
            Kirish
          </h1>
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
          -webkit-tap-highlight-color: transparent; 
        }

        .login-button:hover {
          transform: translateY(-3px);
          filter: brightness(1.2);
        }

        .login-button:active {
          transform: translateY(-1px) scale(0.98);
        }

        input {
          -webkit-appearance: none; 
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
          50% { transform: translate(15px, -20px); }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 15px !important;
          }
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
  width: "300px",
  height: "300px",
  background: "rgba(229, 9, 20, 0.05)",
  borderRadius: "50%",
  top: "5%",
  right: "5%",
  filter: "blur(80px)",
  zIndex: 0,
};

const formStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "24px",
  background: "rgba(20, 20, 20, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  zIndex: 1,
};

const logoWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const playIconStyle: React.CSSProperties = {
  width: "45px",
  height: "45px",
  background: "#e50914",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const playTriangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent",
  borderLeft: "12px solid white",
  marginLeft: "3px",
};

const brandNameStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "18px",
  fontWeight: "900",
  letterSpacing: "2px",
  margin: 0,
};

const titleStyle: React.CSSProperties = {
  fontWeight: "800",
  color: "#fff",
  margin: "0 0 5px 0",
};

const subtitleStyle: React.CSSProperties = {
  color: "#a0a0a0",
  fontSize: "13px",
  margin: 0,
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const labelStyle: React.CSSProperties = {
  color: "#888",
  fontSize: "12px",
  fontWeight: "600",
  marginBottom: "6px",
  display: "block",
  marginLeft: "4px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "10px",
  backgroundColor: "#222",
  border: "1px solid #333",
  color: "#fff",
  fontSize: "16px", 
  transition: "all 0.2s ease-in-out",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "10px",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const errorStyle: React.CSSProperties = {
  color: "#ff4d4d",
  fontSize: "13px",
  textAlign: "center",
  background: "rgba(255, 77, 77, 0.1)",
  padding: "10px",
  borderRadius: "8px",
};

const footerTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#444",
  fontSize: "11px",
};
