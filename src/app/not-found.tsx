"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={containerStyle}>
      {/* Orqa fondagi neon effektlar */}
      <div style={glowStyle}></div>

      <div style={contentStyle}>
        <h1 style={errorCodeStyle}>404</h1>

        <div style={dividerStyle}></div>

        <h2 style={titleStyle}>Sahifa Topilmadi</h2>
        <p style={descriptionStyle}>
          Siz qidirayotgan sahifa o'chirilgan, nomi o'zgartirilgan yoki
          vaqtincha mavjud emas bo'lishi mumkin.
        </p>

        <Link href="/" style={homeBtnStyle}>
          Asosiy Sahifaga Qaytish
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        h1 {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


const containerStyle: React.CSSProperties = {
  backgroundColor: "#030308",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "#ffffff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  textAlign: "center",
  padding: "20px",
  overflow: "hidden",
  position: "relative",
};

const glowStyle: React.CSSProperties = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background:
    "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 0,
};

const contentStyle: React.CSSProperties = {
  zIndex: 1,
  maxWidth: "500px",
};

const errorCodeStyle: React.CSSProperties = {
  fontSize: "120px",
  fontWeight: "900",
  margin: 0,
  lineHeight: "1",
  background: "linear-gradient(to bottom, #ffffff, #A855F7)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-5px",
};

const dividerStyle: React.CSSProperties = {
  width: "60px",
  height: "4px",
  backgroundColor: "#A855F7",
  margin: "20px auto",
  borderRadius: "2px",
  boxShadow: "0 0 15px rgba(168, 85, 247, 0.6)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "15px",
};

const descriptionStyle: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "40px",
};

const homeBtnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "16px 32px",
  backgroundColor: "#A855F7",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "14px",
  fontWeight: "700",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 20px -5px rgba(168, 85, 247, 0.4)",
};
