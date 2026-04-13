"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#070710",
        padding: isMobile ? "20px 0" : "40px 0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", 
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          padding: isMobile ? "0 10px" : "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "0 15px" : "0 70px",
            marginBottom: "30px",
            position: "relative",
            zIndex: 50, 
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: isMobile ? "22px" : "28px",
              fontWeight: "900",
              borderLeft: "4px solid #A855F7",
              paddingLeft: "15px",
              margin: 0,
            }}
          >
            Trend
          </h2>

          <button
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              router.push("/admin");
            }}
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.1)",
              color: "#A855F7",
              border: "1px solid #A855F7",
              padding: isMobile ? "6px 14px" : "10px 22px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: isMobile ? "12px" : "14px",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 101, 
              pointerEvents: "auto", 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#A855F7";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(168, 85, 247, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
              e.currentTarget.style.color = "#A855F7";
              e.currentTarget.style.boxShadow = "none";
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
            gap: isMobile ? "15px 0px" : "5px",
            width: "100%",
            flexWrap: isMobile ? "wrap" : "nowrap",
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
                flex: isMobile ? "0 0 33.33%" : "1",
                maxWidth: isMobile ? "110px" : "200px",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "75px" : "140px",
                  fontWeight: "900",
                  lineHeight: "1",
                  color: "transparent",
                  WebkitTextStroke:
                    hoveredIndex === index
                      ? "2px rgba(161, 144, 255, 0.9)"
                      : "1.5px rgba(161, 144, 255, 0.25)",
                  transition: "all 0.4s ease",
                  zIndex: 1,
                  position: "relative",
                  fontStyle: "italic",
                }}
              >
                {index + 1}
              </span>

              <div
                style={{
                  position: "relative",
                  marginLeft: isMobile ? "-25px" : "-50px",
                  zIndex: 10,
                  transition: "all 0.4s ease",
                  transform:
                    hoveredIndex === index
                      ? "scale(1.08) translateY(-5px)"
                      : "scale(1)",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "75px" : "120px",
                    height: isMobile ? "110px" : "180px",
                    overflow: "hidden",
                    borderRadius: isMobile ? "8px" : "12px",
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
