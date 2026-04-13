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
    <div style={containerStyle} className="dashboard-container">
      <div style={backgroundGlow}></div>

      <style jsx global>{`
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
        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 20px 5% !important;
          }
          .header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .add-btn {
            width: 100% !important;
            padding: 12px !important;
          }
          .table-responsive {
            overflow-x: auto !important;
          }
          .movie-title {
            font-size: 24px !important;
          }
          .image-wrapper {
            width: 35px !important;
            height: 50px !important;
          }
          .modal-content {
            padding: 25px !important;
            width: 95% !important;
            border-radius: 24px !important;
          }
          .action-buttons {
            display: flex !important;
            flex-direction: column !important;
            gap: 5px !important;
          }
        }
        @media (max-width: 600px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>

      <Link href="/" style={backToSiteStyle}>
        ← Saytga qaytish
      </Link>

      <header style={headerStyle} className="header-flex">
        <div>
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h1 style={titleStyle} className="movie-title">
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
            Bazada jami <b>{movies.length}</b> ta film
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={addBtnStyle}
          className="add-btn"
        >
          <span style={{ fontSize: "20px", marginRight: "8px" }}>+</span> Yangi
          Kino
        </button>
      </header>

      {loading ? (
        <div style={loadingWrapperStyle}>
          <div className="spinner"></div>
          <p style={{ color: "#A855F7", marginTop: "20px", fontWeight: "700" }}>
            MA'LUMOTLAR YUKLANMOQDA...
          </p>
        </div>
      ) : (
        <div style={tableContainer} className="table-responsive">
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={{ ...paddingStyle, width: "40px" }}>#</th>
                <th style={paddingStyle}>Film</th>
                <th style={paddingStyle} className="hide-on-mobile">
                  Kategoriya
                </th>
                <th style={{ ...paddingStyle, textAlign: "right" }}>Amallar</th>
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
                    }}
                  >
                    Hozircha film topilmadi.
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
                          gap: "10px",
                        }}
                      >
                        <div style={imageWrapper} className="image-wrapper">
                          <img src={movie.imageUrl} style={imgStyle} alt="" />
                        </div>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "14px",
                            color: "#f8fafc",
                          }}
                        >
                          {movie.title}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{ ...paddingStyle, color: "#94a3b8" }}
                      className="hide-on-mobile"
                    >
                      {movie.category}
                    </td>
                    <td style={{ ...paddingStyle, textAlign: "right" }}>
                      <div className="action-buttons">
                        <button
                          onClick={() => openEditModal(movie)}
                          style={editBtn}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(movie.id, movie.title || "")
                          }
                          style={deleteBtn}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle} className="modal-content">
            <div style={modalHeaderStyle}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#fff",
                }}
              >
                {editingId ? "Tahrirlash" : "+ Yangi Kino Qo'shish"}
              </h2>
              <button onClick={closeModal} style={closeBtnStyle}>
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
                />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Tavsif</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "100px", resize: "none" }}
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" style={submitBtnStyle} disabled={loading}>
                {loading ? "..." : editingId ? "SAQLASH" : "QO'SHISH"}
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
};
const addBtnStyle: React.CSSProperties = {
  backgroundColor: "#A855F7",
  color: "white",
  border: "none",
  padding: "16px 32px",
  borderRadius: "16px",
  fontWeight: "800",
  cursor: "pointer",
};
const tableContainer: React.CSSProperties = {
  backgroundColor: "rgba(11, 11, 21, 0.6)",
  borderRadius: "32px",
  border: "1px solid rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  overflow: "hidden",
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
};
const trStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
};
const paddingStyle: React.CSSProperties = { padding: "20px 25px" };
const imageWrapper: React.CSSProperties = {
  width: "48px",
  height: "68px",
  borderRadius: "12px",
  overflow: "hidden",
};
const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const editBtn: React.CSSProperties = {
  background: "rgba(168, 85, 247, 0.1)",
  border: "1px solid rgba(168, 85, 247, 0.2)",
  color: "#A855F7",
  padding: "8px 12px",
  borderRadius: "10px",
  cursor: "pointer",
  marginRight: "8px",
};
const deleteBtn: React.CSSProperties = {
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  color: "#ef4444",
  padding: "8px 12px",
  borderRadius: "10px",
  cursor: "pointer",
};
const loadingWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
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
  padding: "40px",
  borderRadius: "32px",
  width: "100%",
  maxWidth: "500px",
};
const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};
const closeBtnStyle: React.CSSProperties = {
  background: "#1e1e2d",
  border: "none",
  color: "#64748b",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  cursor: "pointer",
};
const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
const inputGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};
const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: "700",
};
const inputStyle: React.CSSProperties = {
  padding: "14px",
  borderRadius: "12px",
  border: "2px solid #1e1e2d",
  backgroundColor: "rgba(0,0,0,0.3)",
  color: "white",
  outline: "none",
};
const submitBtnStyle: React.CSSProperties = {
  backgroundColor: "#A855F7",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: "14px",
  fontWeight: "800",
  cursor: "pointer",
};
