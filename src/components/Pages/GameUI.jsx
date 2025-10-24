import React, { useState, useEffect, useRef } from "react";
import Earth from "../../assets/Earth.png";
import User from "../../assets/User.png";

const SOLUTION = "CODES"; // 5-letter solution

const rows = 6; // 6 chances
const cols = 5; // 5 letters

const GameUI = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [colors, setColors] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("bg-white/10"))
  );
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [message, setMessage] = useState("");

  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[activeRow]?.[activeCol]?.focus();
  }, [activeRow, activeCol]);

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();

    if (activeRow >= rows) return;

    if (/^[A-Z]$/.test(key)) {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[activeRow][activeCol] = key;
        return newGrid;
      });
      if (activeCol < cols - 1) setActiveCol(activeCol + 1);
    } else if (key === "BACKSPACE") {
      if (activeCol > 0 || grid[activeRow][activeCol] !== "") {
        setGrid((prev) => {
          const newGrid = [...prev];
          if (grid[activeRow][activeCol] === "") {
            newGrid[activeRow][activeCol - 1] = "";
            setActiveCol(activeCol - 1);
          } else {
            newGrid[activeRow][activeCol] = "";
          }
          return newGrid;
        });
      }
    } else if (key === "ENTER") {
      if (grid[activeRow].every((cell) => cell !== "")) {
        checkWord();
      } else {
        setMessage("⚠️ Fill all letters first!");
        setTimeout(() => setMessage(""), 1500);
      }
    }
  };

  const checkWord = () => {
    const rowWord = grid[activeRow].join("");
    const newColors = [...colors];

    rowWord.split("").forEach((letter, i) => {
      if (letter === SOLUTION[i]) {
        newColors[activeRow][i] = "bg-green-500/70 text-white font-bold";
      } else if (SOLUTION.includes(letter)) {
        newColors[activeRow][i] = "bg-yellow-400/70 text-white font-bold";
      } else {
        newColors[activeRow][i] = "bg-gray-600/50 text-white font-bold";
      }
    });

    setColors(newColors);

    if (rowWord === SOLUTION) {
      setMessage("🎉 Correct! You solved the word!");
    } else if (activeRow < rows - 1) {
      setActiveRow(activeRow + 1);
      setActiveCol(0);
    } else {
      setMessage(`❌ Game over! The word was ${SOLUTION}`);
    }
  };

  const handleHelp = () => {
    setMessage("💡 Heart API hint: One letter revealed!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative min-h-screen flex flex-col items-center justify-center w-full bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden outline-none"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-[#001e40] to-[#000814] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.28)_0%,rgba(0,0,0,0.92)_68%)] pointer-events-none" />

      {/* Earth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <img
          src={Earth}
          alt="Earth"
          className="w-[420px] h-[420px] object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.35)]"
        />
      </div>

      {/* User Info */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 z-20">
        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center overflow-hidden">
          <img src={User} alt="User" className="w-8 h-8 object-contain" />
        </div>
        <div className="text-sm leading-tight">
          <p className="tracking-wider">DARK_KNIGHT</p>
          <p className="text-xs text-gray-400">#0069</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[420px] flex flex-col items-center px-6 py-10 text-center">
        <h1
          className="text-4xl mb-6 tracking-widest"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,204,255,0.4)",
          }}
        >
          CipherCore
        </h1>

        {/* Wordle Board */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-lg w-full">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3 mb-2">
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  ref={(el) => {
                    if (!inputsRef.current[rowIndex])
                      inputsRef.current[rowIndex] = [];
                    inputsRef.current[rowIndex][colIndex] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={cell}
                  readOnly
                  className={`w-14 h-14 text-center rounded-md border border-white/20 ${colors[rowIndex][colIndex]} text-2xl font-bold uppercase focus:outline-none`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-2 text-lg tracking-widest border border-[#00bfff] rounded-md text-white transition-all duration-300 hover:shadow-[0_0_10px_#00bfff,0_0_20px_#00bfff] hover:border-[#00ffff]"
          >
            NEW GAME
          </button>
          <button
            onClick={handleHelp}
            className="flex-1 py-2 text-lg tracking-widest border border-[#00bfff] rounded-md text-white transition-all duration-300 hover:shadow-[0_0_10px_#00bfff,0_0_20px_#00bfff] hover:border-[#00ffff]"
          >
            HELP
          </button>
        </div>

        {/* Hint / Message */}
        {message && (
          <p className="mt-4 text-cyan-300 text-sm text-center">{message}</p>
        )}

        <p className="mt-10 text-xs text-gray-400">© 2025 CipherCore</p>
      </main>
    </div>
  );
};

export default GameUI;
