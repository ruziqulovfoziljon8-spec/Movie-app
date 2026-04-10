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
    <div className="relative w-full min-h-screen bg-[#0D0D1F] overflow-hidden font-sans">
      <img
        src={BG.src}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      />

      <div className="relative z-10 flex flex-col items-center pt-16 px-4">
        <img
          src={Logo.src}
          alt="Logo"
          className="w-14 h-14 md:w-16 md:h-16 mb-12 select-none"
        />

        <div className="relative flex items-center justify-center w-full max-w-2xl h-[320px] md:h-[400px]">
          <div className="absolute transform -rotate-12 -translate-x-32 md:-translate-x-44 scale-90 transition-transform hover:scale-100 duration-300">
            <img
              src={kino1.src}
              alt="Kino 1"
              className="w-40 h-60 md:w-48 md:h-72 rounded-2xl shadow-2xl border border-white/10 object-cover"
            />
          </div>

          <div className="absolute z-20 transform scale-105 md:scale-110 shadow-[0_0_60px_rgba(161,144,255,0.25)] transition-transform hover:scale-115 duration-300">
            <img
              src={kino2.src}
              alt="Kino 2"
              className="w-48 h-68 md:w-56 md:h-80 rounded-2xl border border-white/20 object-cover"
            />
          </div>

          <div className="absolute transform rotate-12 translate-x-32 md:translate-x-44 scale-90 transition-transform hover:scale-100 duration-300">
            <img
              src={kino3.src}
              alt="Kino 3"
              className="w-40 h-60 md:w-48 md:h-72 rounded-2xl shadow-2xl border border-white/10 object-cover"
            />
          </div>
        </div>

        <h1 className="text-white text-4xl md:text-6xl font-bold text-center mt-12 max-w-4xl leading-[1.1] tracking-tight">
          O'zingizga yoqadigan{" "}
          <span className="text-[#A190FF]">Filmlarni </span>
          <br className="hidden md:block" />
          Qiyinchiliksiz toping!
        </h1>

        <div className="relative w-full max-w-2xl mt-12 mb-20 group">
          <div className="absolute inset-y-0 left-5 flex items-center z-20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400 group-focus-within:text-[#A190FF] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="300 dan ortiq filmlarni onlayn qidiring"
            className="relative z-10 w-full bg-[#121229]/60 backdrop-blur-xl text-white border border-gray-800 py-5 pl-14 pr-6 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-[#A190FF]/40 focus:border-[#A190FF]/20 transition-all placeholder:text-gray-500 shadow-inner"
         />
        </div>
      </div>
      <Trend />
      <Ommabop searchTerm={searchTerm} />
    </div>
  );
}
