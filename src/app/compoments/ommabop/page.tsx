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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const closeModal = () => setSelectedMovie(null);

  const handleWatchNow = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Ushbu kino uchun video havola mavjud emas.");
    }
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
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        <div className="animate-pulse"> Malumotlar Yuklanmoqda...</div>
      </div>
    );

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#070710",
        minHeight: "100vh",
        padding: "60px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1250px", margin: "0 auto" }}>
        {/* Sarlavha qismi */}
        <div
          style={{
            marginBottom: "50px",
            borderLeft: "6px solid #A855F7",
            paddingLeft: "20px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Ommabop <span style={{ color: "#A855F7" }}>Kinolar</span>
          </h2>
          <p style={{ color: "#64748B", marginTop: "5px" }}>
            {searchTerm
              ? `"${searchTerm}" bo'yicha qidiruv natijalari`
              : "Eng so'nggi va sara filmlar to'plami"}
          </p>
        </div>

        {filteredMovies.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="movie-card"
                style={{
                  backgroundColor: "#111122",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(168, 85, 247, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
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
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "rgba(0, 0, 0, 0.6)",
                      backdropFilter: "blur(8px)",
                      padding: "6px 12px",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "700",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span style={{ color: "#FACC15" }}>★</span>{" "}
                    {movie.rating || "0.0"}
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "700",
                      margin: "0 0 8px 0",
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
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {movie.category}
                    </span>
                    <span style={{ color: "#475569", fontSize: "12px" }}>
                      {movie.releaseDate}
                    </span>
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
            <h3 style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>
              Bunday ma'lumotlar yo'q
            </h3>
            <p>Qidiruv so'zini o'zgartirib ko'ring</p>
          </div>
        )}

        {filteredMovies.length > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "60px",
              gap: "25px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              style={{
                backgroundColor: "#111122",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "14px",
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#A855F7",
                cursor: currentPage === 1 ? "default" : "pointer",
                opacity: currentPage === 1 ? 0.3 : 1,
                fontSize: "22px",
              }}
            >
              ←
            </button>

            <div
              style={{ color: "#64748B", fontSize: "18px", fontWeight: "700" }}
            >
              <span style={{ color: "white", fontSize: "22px" }}>
                {currentPage}
              </span>
              <span style={{ margin: "0 10px", opacity: 0.5 }}>/</span>
              {totalPages}
            </div>

            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              style={{
                backgroundColor: "#111122",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "14px",
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#A855F7",
                cursor: currentPage === totalPages ? "default" : "pointer",
                opacity: currentPage === totalPages ? 0.3 : 1,
                fontSize: "22px",
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {selectedMovie && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#0F0F1A",
              width: "100%",
              maxWidth: "850px",
              borderRadius: "32px",
              overflow: "hidden",
              color: "white",
              position: "relative",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "450px" }}
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
                  top: "25px",
                  right: "25px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "none",
                  color: "white",
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ✕
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "40px",
                  right: "40px",
                }}
              >
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: "900",
                    margin: "10px 0",
                  }}
                >
                  {selectedMovie.title}
                </h2>
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <span
                    style={{
                      color: "#FACC15",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    ★ {selectedMovie.rating}
                  </span>
                  <span style={{ color: "#CBD5E1" }}>
                    {selectedMovie.releaseDate}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: "40px" }}>
              <h4
                style={{
                  color: "#A855F7",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "15px",
                }}
              >
                MAZMUNI
              </h4>
              <p
                style={{
                  lineHeight: "1.7",
                  color: "#94A3B8",
                  fontSize: "17px",
                  marginBottom: "40px",
                }}
              >
                {selectedMovie.overview}
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  onClick={() => handleWatchNow(selectedMovie.videoUrl)}
                  style={{
                    backgroundColor: "#A855F7",
                    color: "white",
                    padding: "18px 45px",
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "800",
                    fontSize: "17px",
                    cursor: "pointer",
                    flex: 2,
                  }}
                >
                  Hozir ko'rish
                </button>
                <button
                  onClick={() => handleShare(selectedMovie)}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "white",
                    padding: "18px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    flex: 1,
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
