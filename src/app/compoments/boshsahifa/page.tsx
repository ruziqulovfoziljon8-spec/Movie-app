"use client";

import React, { useState } from "react";
import BG from "../images/BG.png";
import Logo from "../images/logo.png";
import kino1 from "../images/kn1.png";
import kino2 from "../images/kn2.png";
import kino3 from "../images/kn3.png";
import Trend from "../trend/page";
import Ommabop from "../ommabop/page";

export default function Boshsahifa() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={containerStyle}>
      <img src={BG.src} alt="Background" style={bgImageStyle} />

      <style jsx>{`
        .nav-btn:hover {
          border-color: rgba(161, 144, 255, 0.4) !important;
          background-color: #1a1a3a !important;
        }
        .nav-btn:active {
          transform: scale(0.9);
        }
        .nav-btn:hover .arrow-left {
          transform: translateX(-4px);
        }
        .nav-btn:hover .arrow-right {
          transform: translateX(4px);
        }

        .search-input:focus {
          border-color: rgba(161, 144, 255, 0.4) !important;
          box-shadow: 0 0 0 2px rgba(161, 144, 255, 0.1);
          background-color: rgba(20, 20, 45, 0.85) !important;
        }

        .poster-item:hover {
          transform: scale(1.05) !important;
          z-index: 30;
        }

        @media (max-width: 640px) {
          .content-wrapper {
            padding-top: 40px !important;
          }
          .logo-img {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 30px !important;
          }
          .poster-container {
            height: 220px !important;
            margin-top: 10px !important;
          }
          .poster-img {
            width: 110px !important;
            height: 160px !important;
            border-radius: 12px !important;
          }
          .side-poster {
            transform: scale(0.85) !important;
          }
          .left-p {
            transform: rotate(-10deg) translateX(-65px) !important;
          }
          .right-p {
            transform: rotate(10deg) translateX(65px) !important;
          }
          .main-title {
            font-size: 1.6rem !important;
            margin-top: 25px !important;
            line-height: 1.2 !important;
            padding: 0 10px !important;
          }
          .search-box {
            margin-top: 25px !important;
            margin-bottom: 40px !important;
            max-width: 92% !important;
          }
          .search-input {
            padding: 14px 14px 14px 45px !important;
            font-size: 0.95rem !important;
            border-radius: 12px !important;
          }
          .pagination-wrapper {
            gap: 40px !important;
            margin-top: 40px !important;
            padding-bottom: 50px !important;
          }
          .page-info {
            font-size: 1.1rem !important;
            letter-spacing: 0.15em !important;
          }
          .nav-btn {
            padding: 12px !important;
          }
        }
      `}</style>

      <div style={contentWrapperStyle} className="content-wrapper">
        <img src={Logo.src} alt="Logo" style={logoStyle} className="logo-img" />

        <div style={posterContainerStyle} className="poster-container">
          <div
            style={{
              ...posterBaseStyle,
              transform: "rotate(-12deg) translateX(-180px) scale(0.9)",
            }}
            className="poster-item left-p side-poster"
          >
            <img
              src={kino1.src}
              alt="Kino 1"
              style={posterImgStyle}
              className="poster-img"
            />
          </div>

          <div
            style={{
              ...posterBaseStyle,
              zIndex: 20,
              transform: "scale(1.1)",
              boxShadow: "0 0 60px rgba(161, 144, 255, 0.25)",
            }}
            className="poster-item"
          >
            <img
              src={kino2.src}
              alt="Kino 2"
              style={{
                ...posterImgStyle,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              className="poster-img"
            />
          </div>

          <div
            style={{
              ...posterBaseStyle,
              transform: "rotate(12deg) translateX(180px) scale(0.9)",
            }}
            className="poster-item right-p side-poster"
          >
            <img
              src={kino3.src}
              alt="Kino 3"
              style={posterImgStyle}
              className="poster-img"
            />
          </div>
        </div>

        <h1 style={titleStyle} className="main-title">
          O'zingizga yoqadigan{" "}
          <span style={{ color: "#A190FF" }}>Filmlarni </span>
          <br />
          Qiyinchiliksiz toping!
        </h1>

        <div style={searchBoxStyle} className="search-box">
          <div style={searchIconStyle}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21L16.65 16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filmlarni qidiring..."
            style={inputStyle}
            className="search-input"
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
        <Trend />
        <Ommabop searchTerm={searchTerm} />
      </div>


    </div>
  );
}


const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#0D0D1F",
  overflowX: "hidden",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const bgImageStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
  opacity: 0.4,
};

const contentWrapperStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "64px",
  paddingLeft: "16px",
  paddingRight: "16px",
};

const logoStyle: React.CSSProperties = {
  width: "64px",
  height: "64px",
  marginBottom: "48px",
  userSelect: "none",
};

const posterContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "42rem",
  height: "400px",
};

const posterBaseStyle: React.CSSProperties = {
  position: "absolute",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
};

const posterImgStyle: React.CSSProperties = {
  width: "192px",
  height: "288px",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  border: "1px solid rgba(255,255,255,0.1)",
  objectFit: "cover",
};

const titleStyle: React.CSSProperties = {
  color: "white",
  fontSize: "3.75rem",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "48px",
  maxWidth: "56rem",
  lineHeight: 1.1,
  letterSpacing: "-0.025em",
};

const searchBoxStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "35rem",
  marginTop: "48px",
  marginBottom: "64px",
};

const searchIconStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "18px",
  transform: "translateY(-50%)",
  zIndex: 20,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(18, 18, 41, 0.6)",
  backdropFilter: "blur(15px)",
  color: "white",
  border: "1px solid #1f2937",
  padding: "18px 20px 18px 55px",
  borderRadius: "16px",
  fontSize: "1.1rem",
  outline: "none",
  transition: "all 0.3s ease",
};