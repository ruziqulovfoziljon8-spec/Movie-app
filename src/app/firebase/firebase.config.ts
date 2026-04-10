import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6u0n3nGrc_yDvmci82LXLEERVnFGsjOI",
  authDomain: "movie-app-e143e.firebaseapp.com",
  projectId: "movie-app-e143e",
  storageBucket: "movie-app-e143e.firebasestorage.app",
  messagingSenderId: "786839503030",
  appId: "1:786839503030:web:821dc25a9a33bf10502617",
  measurementId: "G-9MWNTS92PY",
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

export const db = getFirestore(app);
