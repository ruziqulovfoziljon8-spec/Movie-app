"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  overview: string;
  videoUrl: string;
  category: string;
}

export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    overview: "",
    videoUrl: "",
  });

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
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

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const finalData = {
      ...formData,
      category: "Harakat • Film",
      rating: 4.6,
      releaseDate: today,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "users", editingId), finalData);
        const q = query(
          collection(db, "popularMovies"),
          where("title", "==", finalData.title)
        );
        const popSnap = await getDocs(q);
        popSnap.forEach(async (d) => {
          await updateDoc(doc(db, "popularMovies", d.id), finalData);
        });
      } else {
        await addDoc(collection(db, "users"), finalData);
        await addDoc(collection(db, "popularMovies"), finalData);
      }
      closeModal();
      fetchMovies();
    } catch (err) {
      alert("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm("Haqiqatdan ham ushbu kinoni o'chirmoqchimisiz?"))
      return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      const q = query(
        collection(db, "popularMovies"),
        where("title", "==", title)
      );
      const popSnap = await getDocs(q);
      popSnap.forEach(async (d) => {
        await deleteDoc(doc(db, "popularMovies", d.id));
      });
      fetchMovies();
    } catch (err) {
      alert("O'chirishda xatolik!");
      setLoading(false);
    }
  };

  const openEditModal = (movie: Movie) => {
    setEditingId(movie.id);
    setFormData({
      title: movie.title,
      imageUrl: movie.imageUrl,
      overview: movie.overview,
      videoUrl: movie.videoUrl,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", imageUrl: "", overview: "", videoUrl: "" });
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundGlow}></div>

      <Link
        href="/"
        style={backToSiteStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.backgroundColor = "rgba(168, 85, 247, 0.15)";
          e.currentTarget.style.transform = "translateX(-5px)";
          e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = "#94a3b8";
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
        }}
      >
        ← Saytga qaytish
      </Link>

      <header style={headerStyle}>
        <div>
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h1 style={titleStyle}>
              Kino{" "}
              <span
                style={{
                  color: "#A855F7",
                  textShadow: "0 0 25px rgba(168,85,247,0.6)",
                }}
              >
                Admin Panel
              </span>
            </h1>
          </Link>
          <p style={statsStyle}>
            Bazada jami <b>{movies.length}</b> ta film mavjud
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={addBtnStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px -10px rgba(168, 85, 247, 0.7)";
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 10px 20px -5px rgba(168, 85, 247, 0.4)";
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          <span style={{ fontSize: "20px", marginRight: "8px" }}>+</span> Yangi
          Kino Qo'shish
        </button>
      </header>

      {loading ? (
        <div style={loadingWrapperStyle}>
          <div className="spinner"></div>
          <p
            style={{
              color: "#A855F7",
              marginTop: "20px",
              fontWeight: "700",
              letterSpacing: "2px",
              textShadow: "0 0 10px rgba(168,85,247,0.3)",
            }}
          >
            MA'LUMOTLAR YUKLANMOQDA...
          </p>
          <style jsx>{`
            .spinner {
              width: 60px;
              height: 60px;
              border: 5px solid rgba(168, 85, 247, 0.1);
              border-top: 5px solid #a855f7;
              border-radius: 50%;
              animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : (
        <div style={tableContainer}>
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={{ ...paddingStyle, width: "60px" }}>#</th>
                <th style={paddingStyle}>Film</th>
                <th style={paddingStyle}>Kategoriya</th>
                <th style={paddingStyle}>Holati</th>
                <th style={{ ...paddingStyle, textAlign: "right" }}>
                  Boshqaruv
                </th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "100px",
                      color: "#64748b",
                      fontSize: "18px",
                    }}
                  >
                    Hozircha hech qanday film topilmadi.
                  </td>
                </tr>
              ) : (
                [...movies].reverse().map((movie, index) => (
                  <tr key={movie.id} style={trStyle} className="table-row">
                    <td
                      style={{
                        ...paddingStyle,
                        color: "#475569",
                        fontWeight: "600",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td style={paddingStyle}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div style={imageWrapper}>
                          <img src={movie.imageUrl} style={imgStyle} alt="" />
                        </div>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "16px",
                            color: "#f8fafc",
                          }}
                        >
                          {movie.title}
                        </span>
                      </div>
                    </td>
                    <td style={{ ...paddingStyle, color: "#94a3b8" }}>
                      {movie.category}
                    </td>
                    <td style={paddingStyle}>
                      <span style={badgeStyle}>Active</span>
                    </td>
                    <td style={{ ...paddingStyle, textAlign: "right" }}>
                      <button
                        onClick={() => openEditModal(movie)}
                        style={editBtn}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#A855F7";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.boxShadow =
                            "0 8px 15px rgba(168, 85, 247, 0.4)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(168, 85, 247, 0.1)";
                          e.currentTarget.style.color = "#A855F7";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(movie.id, movie.title || "")
                        }
                        style={deleteBtn}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#ef4444";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.boxShadow =
                            "0 8px 15px rgba(239, 68, 68, 0.4)";
                          e.currentTarget.style.transform =
                            "translateY(-2px) scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(239, 68, 68, 0.1)";
                          e.currentTarget.style.color = "#ef4444";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                        }}
                      >
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <style jsx>{`
            .table-row:hover {
              background-color: rgba(255, 255, 255, 0.02);
            }
          `}</style>
        </div>
      )}

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={modalHeaderStyle}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#fff",
                }}
              >
                {editingId ? "Tahrirlash" : "Yangi Kino Qo'shish"}
              </h2>
              <button
                onClick={closeModal}
                style={closeBtnStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2d2d3d")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1e1e2d")
                }
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={inputGroup}>
                <label style={labelStyle}>Film Nomi</label>
                <input
                  style={inputStyle}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="Kino nomini kiriting..."
                  onFocus={(e) => (e.target.style.borderColor = "#A855F7")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e2d")}
                />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Poster (URL)</label>
                <input
                  style={inputStyle}
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  required
                  placeholder="Rasm manzilini kiriting..."
                  onFocus={(e) => (e.target.style.borderColor = "#A855F7")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e2d")}
                />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Video Link (URL)</label>
                <input
                  style={inputStyle}
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="Video manzilini kiriting..."
                  onFocus={(e) => (e.target.style.borderColor = "#A855F7")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e2d")}
                />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Tavsif</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "120px", resize: "none" }}
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  required
                  placeholder="Film haqida qisqacha ma'lumot..."
                  onFocus={(e) => (e.target.style.borderColor = "#A855F7")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e2d")}
                />
              </div>
              <button
                type="submit"
                style={submitBtnStyle}
                disabled={loading}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(168, 85, 247, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px -5px rgba(168, 85, 247, 0.4)";
                }}
              >
                {loading
                  ? "Tekshirilmoqda..."
                  : editingId
                  ? "O'ZGARIŞLARNI SAQLASH"
                  : "PLATFORMAGA QO'SHISH"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


const containerStyle: React.CSSProperties = {
  padding: "60px 8%",
  backgroundColor: "#030308",
  minHeight: "100vh",
  color: "#e2e8f0",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  position: "relative",
  overflow: "hidden",
};

const backgroundGlow: React.CSSProperties = {
  position: "absolute",
  top: "-10%",
  right: "-5%",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(3, 3, 8, 0) 70%)",
  zIndex: 0,
  pointerEvents: "none",
};

const backToSiteStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "40px",
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "700",
  padding: "10px 20px",
  borderRadius: "100px",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  position: "relative",
  zIndex: 1,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "60px",
  position: "relative",
  zIndex: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: "38px",
  margin: 0,
  fontWeight: "900",
  letterSpacing: "-1.5px",
  color: "#fff",
};

const statsStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: "15px",
  margin: "12px 0 0 0",
  fontWeight: "500",
};

const addBtnStyle: React.CSSProperties = {
  backgroundColor: "#A855F7",
  color: "white",
  border: "none",
  padding: "16px 32px",
  borderRadius: "16px",
  fontWeight: "800",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 10px 20px -5px rgba(168, 85, 247, 0.4)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tableContainer: React.CSSProperties = {
  backgroundColor: "rgba(11, 11, 21, 0.6)",
  borderRadius: "32px",
  border: "1px solid rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  overflow: "hidden",
  boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5)",
  position: "relative",
  zIndex: 1,
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thRowStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.02)",
  textAlign: "left",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  color: "#94a3b8",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const trStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  transition: "all 0.3s ease",
};

const paddingStyle: React.CSSProperties = { padding: "25px 35px" };

const imageWrapper: React.CSSProperties = {
  width: "48px",
  height: "68px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const badgeStyle: React.CSSProperties = {
  padding: "6px 14px",
  backgroundColor: "rgba(34, 197, 94, 0.1)",
  color: "#4ade80",
  borderRadius: "100px",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.5px",
};

const editBtn: React.CSSProperties = {
  background: "rgba(168, 85, 247, 0.1)",
  border: "1px solid rgba(168, 85, 247, 0.2)",
  color: "#A855F7",
  padding: "10px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  marginRight: "12px",
  fontSize: "13px",
  fontWeight: "700",
  transition: "all 0.3s ease",
};

const deleteBtn: React.CSSProperties = {
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  color: "#ef4444",
  padding: "10px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "700",
  transition: "all 0.3s ease",
};

const loadingWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "450px",
  backgroundColor: "rgba(11, 11, 21, 0.4)",
  borderRadius: "32px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(15px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#0b0b14",
  padding: "45px",
  borderRadius: "38px",
  width: "100%",
  maxWidth: "520px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow:
    "0 50px 100px rgba(0, 0, 0, 0.9), 0 0 50px rgba(168, 85, 247, 0.1)",
  position: "relative",
};

const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "35px",
};

const closeBtnStyle: React.CSSProperties = {
  background: "#1e1e2d",
  border: "none",
  color: "#64748b",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};
const inputGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",
};
const inputStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderRadius: "16px",
  border: "2px solid #1e1e2d",
  backgroundColor: "rgba(0,0,0,0.3)",
  color: "white",
  fontSize: "15px",
  outline: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};
const submitBtnStyle: React.CSSProperties = {
  backgroundColor: "#A855F7",
  color: "white",
  border: "none",
  padding: "20px",
  borderRadius: "18px",
  fontWeight: "900",
  cursor: "pointer",
  boxShadow: "0 10px 20px -5px rgba(168, 85, 247, 0.4)",
  transition: "all 0.4s",
  marginTop: "10px",
  letterSpacing: "1px",
};
