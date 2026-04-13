"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

interface Movie {
  id: string;
  title?: string;
  imageUrl?: string;
  rating?: string | number;
  category?: string;
  overview?: string;
  releaseDate?: string;
  videoUrl?: string;
}

export default function Ommabop({ searchTerm = "" }: { searchTerm?: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const colRef = collection(db, "users");
        const querySnapshot = await getDocs(colRef);
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Movie[];
        setMovies(moviesData);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovies.length / itemsPerPage)
  );

  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const closeModal = () => setSelectedMovie(null);

  const handleWatchNow = (url?: string) => {
    if (url) window.open(url, "_blank");
    else alert("Ushbu kino uchun video havola mavjud emas.");
  };

  const handleShare = async (movie: Movie) => {
    const shareUrl = `${window.location.origin}?id=${movie.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: `${movie.title} kinosini ko'rishni tavsiya qilaman!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Havola nusxalandi!");
    }
  };

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          color: "#A855F7",
          backgroundColor: "#070710",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "600" }}>
          Ma'lumotlar yuklanmoqda...
        </div>
      </div>
    );

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#070710",
        minHeight: "100vh",
        padding: isMobile ? "30px 0" : "60px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style jsx>{`
        .movie-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        @media (min-width: 769px) {
          .movie-card:hover {
            transform: translateY(-12px) scale(1.03);
            box-shadow: 0 20px 40px rgba(168, 85, 247, 0.25);
            border-color: rgba(168, 85, 247, 0.5) !important;
            z-index: 10;
          }
          .movie-card:hover img {
            transform: scale(1.1);
          }
        }
        .pagination-btn:active {
          transform: scale(0.9);
        }
        .modal-overlay {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div
        style={{
          width: isMobile ? "92%" : "90%",
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? "30px" : "50px",
            borderLeft: "6px solid #A855F7",
            paddingLeft: "20px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "800",
              margin: 0,
            }}
          >
            Ommabop <span style={{ color: "#A855F7" }}>Kinolar</span>
          </h2>
          <p
            style={{
              color: "#64748B",
              marginTop: "5px",
              fontSize: isMobile ? "13px" : "16px",
            }}
          >
            {searchTerm
              ? `"${searchTerm}" bo'yicha natijalar`
              : "Eng so'nggi va sara filmlar to'plami"}
          </p>
        </div>

        {filteredMovies.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(auto-fill, minmax(280px, 1fr))",
              gap: isMobile ? "15px" : "30px",
            }}
          >
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="movie-card"
                style={{
                  backgroundColor: "#111122",
                  borderRadius: isMobile ? "16px" : "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "2/3",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={movie.imageUrl || "https://picsum.photos/600/900"}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: isMobile ? "8px" : "15px",
                      right: isMobile ? "8px" : "15px",
                      background: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(10px)",
                      padding: isMobile ? "4px 8px" : "6px 12px",
                      borderRadius: isMobile ? "8px" : "12px",
                      color: "white",
                      fontSize: isMobile ? "11px" : "13px",
                      fontWeight: "700",
                      display: "flex",
                      gap: "5px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ color: "#FACC15" }}>★</span>{" "}
                    {movie.rating || "0.0"}
                  </div>
                </div>
                <div style={{ padding: isMobile ? "12px" : "20px" }}>
                  <h3
                    style={{
                      color: "white",
                      fontSize: isMobile ? "14px" : "18px",
                      fontWeight: "700",
                      margin: "0 0 5px 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#A855F7",
                        fontSize: isMobile ? "11px" : "13px",
                        fontWeight: "600",
                      }}
                    >
                      {movie.category}
                    </span>
                    {!isMobile && (
                      <span style={{ color: "#475569", fontSize: "12px" }}>
                        {movie.releaseDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "#64748B",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ color: "white", fontSize: "24px" }}>
              Hech narsa topilmadi
            </h3>
          </div>
        )}

        {filteredMovies.length > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
              gap: "25px",
              position: "relative",
              zIndex: 50,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="pagination-btn"
              style={{
                backgroundColor: "#111122",
                border: "1px solid #A855F750",
                borderRadius: "15px",
                width: "50px",
                height: "50px",
                color: "white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.2 : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                transition: "0.2s",
                pointerEvents: currentPage === 1 ? "none" : "auto",
              }}
              disabled={currentPage === 1}
            >
              ←
            </button>

            <div
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: isMobile ? "18px" : "22px",
                minWidth: "100px",
                textAlign: "center",
                letterSpacing: "2px",
                userSelect: "none",
              }}
            >
              {currentPage} <span style={{ color: "#A855F7" }}>/</span>{" "}
              {totalPages}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className="pagination-btn"
              style={{
                backgroundColor: "#111122",
                border: "1px solid #A855F750",
                borderRadius: "15px",
                width: "50px",
                height: "50px",
                color: "white",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.2 : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                transition: "0.2s",
                pointerEvents: currentPage === totalPages ? "none" : "auto",
              }}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>

      {selectedMovie && (
        <div
          onClick={closeModal}
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "flex-end" : "center",
            padding: isMobile ? "0" : "20px",
            backdropFilter: "blur(15px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#0F0F1A",
              width: "100%",
              maxWidth: "800px",
              borderRadius: isMobile ? "25px 25px 0 0" : "32px",
              overflow: "hidden",
              color: "white",
              border: "1px solid #A855F733",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                height: isMobile ? "240px" : "400px",
              }}
            >
              <img
                src={selectedMovie.imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={selectedMovie.title}
              />
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "white",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                ✕
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(to top, #0F0F1A, transparent)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "22px" : "36px",
                    fontWeight: "900",
                    margin: "0 0 10px 0",
                  }}
                >
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    fontSize: "14px",
                    color: "#A855F7",
                    fontWeight: "bold",
                  }}
                >
                  <span>★ {selectedMovie.rating}</span>
                  <span style={{ color: "#64748B" }}>|</span>
                  <span style={{ color: "#94A3B8" }}>
                    {selectedMovie.releaseDate}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ padding: isMobile ? "20px" : "30px" }}>
              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: "1.6",
                  marginBottom: "30px",
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                {selectedMovie.overview}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() => handleWatchNow(selectedMovie.videoUrl)}
                  style={{
                    backgroundColor: "#A855F7",
                    color: "white",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: "800",
                    cursor: "pointer",
                    flex: 2,
                    fontSize: "16px",
                  }}
                >
                  Ko'rishni boshlash
                </button>
                <button
                  onClick={() => handleShare(selectedMovie)}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "white",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid #ffffff1a",
                    cursor: "pointer",
                    flex: 1,
                    fontWeight: "600",
                  }}
                >
                  Ulashish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
