"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import trend1 from "../images/trend11.png";
import trend2 from "../images/trend2.png";
import trend3 from "../images/trend3.png";
import trend4 from "../images/trend4.png";
import trend5 from "../images/trend5.png";
import trend6 from "../images/trend6.png";

const trendingMovies = [
  { id: 1, title: "Avatar", image: trend1 },
  { id: 2, title: "John Wick", image: trend2 },
  { id: 3, title: "Spider-Man", image: trend3 },
  { id: 4, title: "Batman", image: trend4 },
  { id: 5, title: "Inception", image: trend5 },
  { id: 6, title: "Interstellar", image: trend6 },
];

export default function Trend() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter(); // Routerni ishga tushiramiz

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#070710",
        padding: "40px 0",
        overflow: "hidden",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1400px", padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 70px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: "900",
              borderLeft: "4px solid #A855F7",
              borderRadius: "3px",
              paddingLeft: "15px",
              margin: 0,
            }}
          >
            Trend
          </h2>

          <button
            onClick={() => router.push("/admin")}
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.1)",
              color: "#A855F7",
              border: "1px solid #A855F7",
              padding: "8px 20px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 100, 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#A855F7";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
              e.currentTarget.style.color = "#A855F7";
            }}
          >
            Admin Panel 🔐
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            width: "100%",
            flexWrap: "nowrap",
          }}
        >
          {trendingMovies.map((movie, index) => (
            <div
              key={movie.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.4s ease",
                flex: "1",
                maxWidth: "200px",
              }}
            >
              <span
                style={{
                  fontSize: "140px",
                  fontWeight: "900",
                  lineHeight: "1",
                  color: "transparent",
                  WebkitTextStroke:
                    hoveredIndex === index
                      ? "2px rgba(161, 144, 255, 0.9)"
                      : "1.5px rgba(161, 144, 255, 0.25)",
                  transition: "all 0.4s ease",
                  zIndex: 0,
                  position: "relative",
                  fontStyle: "italic",
                  userSelect: "none", 
                }}
              >
                {index + 1}
              </span>

              <div
                style={{
                  position: "relative",
                  marginLeft: "-50px",
                  zIndex: 10,
                  transition: "all 0.4s ease",
                  transform:
                    hoveredIndex === index
                      ? "scale(1.1) translateY(-10px)"
                      : "scale(1)",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "12px",
                    border:
                      hoveredIndex === index
                        ? "2px solid #A190FF"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "#131325",
                  }}
                >
                  <img
                    src={
                      typeof movie.image === "string"
                        ? movie.image
                        : (movie.image as any).src
                    }
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
