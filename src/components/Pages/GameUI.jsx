import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Earth from "../../assets/Earth.png";
import User from "../../assets/User.png";
import Bulb from "../../assets/Bulb.png";
import { Link } from "react-router-dom";
import { soundManager } from "../../utils/soundManager";

const rows = 6;
const cols = 5;
const TOTAL_GAME_TIME = 120;

export let CURRENT_GAME_WORD = null;

const GameUI = () => {
  const [solution, setSolution] = useState(null);
  const [grid, setGrid] = useState(
    () =>
      JSON.parse(localStorage.getItem("ciphercore_grid")) ||
      Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [colors, setColors] = useState(
    () =>
      JSON.parse(localStorage.getItem("ciphercore_colors")) ||
      Array.from({ length: rows }, () => Array(cols).fill("bg-white/10"))
  );
  const [activeRow, setActiveRow] = useState(
    () => JSON.parse(localStorage.getItem("ciphercore_activeRow")) || 0
  );
  const [activeCol, setActiveCol] = useState(
    () => JSON.parse(localStorage.getItem("ciphercore_activeCol")) || 0
  );
  const [lives, setLives] = useState(
    () => JSON.parse(localStorage.getItem("ciphercore_lives")) || rows
  );
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [countdown, setCountdown] = useState(
    () =>
      JSON.parse(localStorage.getItem("ciphercore_countdown")) ||
      TOTAL_GAME_TIME
  );
  const [totalTime, setTotalTime] = useState(
    () =>
      JSON.parse(localStorage.getItem("ciphercore_totalTime")) || 0
  );

  const timerRef = useRef(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // NEW: Player name + tag
  const [playerName, setPlayerName] = useState("Guest");
  const [playerTag, setPlayerTag] = useState("#0000");

  // NEW: Load the logged-in user
  useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const name = user.email ? user.email.split("@")[0] : "Player";
        const tag = "#" + user.id.slice(-4);
        setPlayerName(name.toUpperCase());
        setPlayerTag(tag);
      }
    };
    loadUserData();
  }, []);


  //play sound
  useEffect(() => {
    const unlockAudio = async () => {
      await soundManager.unlock();
      soundManager.startBackground();
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => window.removeEventListener("click", unlockAudio);
  }, []);





  // Fetch word from Supabase
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const { data, error } = await supabase.from("words").select("word");
        if (error) throw error;
        if (data && data.length > 0) {
          const randomWord =
            data[Math.floor(Math.random() * data.length)].word.toUpperCase();
          setSolution(randomWord);
          CURRENT_GAME_WORD = randomWord;
        } else {
          setMessage("⚠️ No words found in database.");
        }
      } catch (err) {
        console.error("Error fetching word:", err);
        setMessage("⚠️ Failed to load word.");
      }
    };
    fetchWord();
  }, []);

  // Save game state
  useEffect(() => {
    localStorage.setItem("ciphercore_grid", JSON.stringify(grid));
    localStorage.setItem("ciphercore_colors", JSON.stringify(colors));
    localStorage.setItem("ciphercore_activeRow", JSON.stringify(activeRow));
    localStorage.setItem("ciphercore_activeCol", JSON.stringify(activeCol));
    localStorage.setItem("ciphercore_lives", JSON.stringify(lives));
    localStorage.setItem("ciphercore_countdown", JSON.stringify(countdown));
    localStorage.setItem("ciphercore_totalTime", JSON.stringify(totalTime));
  }, [grid, colors, activeRow, activeCol, lives, countdown, totalTime]);

  // Countdown
  useEffect(() => {
    if (isGameOver) return;
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleGameOver("⏳ Time’s up! Game Over!");
          return 0;
        }
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isGameOver]);

  // Focus active box
  useEffect(() => {
    inputsRef.current[activeRow]?.[activeCol]?.focus();
  }, [activeRow, activeCol]);

  // Hints
  useEffect(() => {
    const storedHint = localStorage.getItem("ciphercore_hint_solved");
    const autofillLetter = localStorage.getItem("ciphercore_autofill_letter");

    if (storedHint === "true" && solution && autofillLetter) {
      const remainingIndexes = solution
        .split("")
        .map((_, i) => i)
        .filter((i) => grid[activeRow][i] !== solution[i]);

      if (remainingIndexes.length > 0) {
        const targetIndexes = remainingIndexes.filter(
          (i) => solution[i] === autofillLetter
        );
        if (targetIndexes.length > 0) {
          const index = targetIndexes[0];
          setGrid((prev) => {
            const newGrid = [...prev];
            newGrid[activeRow][index] = autofillLetter;
            return newGrid;
          });
          setMessage("💡 Hint Used: One correct letter revealed!");
          setTimeout(() => setMessage(""), 2000);
        }
      }

      localStorage.removeItem("ciphercore_hint_solved");
      localStorage.removeItem("ciphercore_autofill_letter");
    }
  }, [solution, activeRow, grid]);

  // Keyboard input
  const handleKeyDown = (e) => {
    if (isGameOver || !solution) return;
    const key = e.key.toUpperCase();
    if (activeRow >= rows) return;

    if (/^[A-Z]$/.test(key)) {
      soundManager.play("click");
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[activeRow][activeCol] = key;
        return newGrid;
      });
      if (activeCol < cols - 1) setActiveCol(activeCol + 1);
    } else if (key === "BACKSPACE") {
      soundManager.play("click");
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

  // Check row
const checkWord = () => {
  if (!solution) return;
  const rowWord = grid[activeRow].join("");
  const newColors = [...colors];

  rowWord.split("").forEach((letter, i) => {
    if (letter === solution[i]) {
      newColors[activeRow][i] = "bg-green-500/70 text-white font-bold";
    } else if (solution.includes(letter)) {
      newColors[activeRow][i] = "bg-yellow-400/70 text-white font-bold";
    } else {
      newColors[activeRow][i] = "bg-red-600/50 text-white font-bold";
    }
  });

  setColors(newColors);

  // --- WIN ---
  if (rowWord === solution) {
    soundManager.play("correct");     // 🔊 PLAY WIN SOUND
    handleGameOver("🎉 You Successfully Countered The Hacker!");
    return;
  }

  // --- WRONG (but has attempts left) ---
  if (activeRow < rows - 1) {
    soundManager.play("error");       // 🔊 WRONG ROW SOUND
    setActiveRow(activeRow + 1);
    setActiveCol(0);
    setLives((prev) => prev - 1);

    if (lives - 1 === 0) {
      handleGameOver("❌ Game Over! You got hacked!");
    }
    return;
  }

  // --- WRONG + no attempts left ---
  soundManager.play("error");         // 🔊 FINAL FAILURE SOUND
  handleGameOver("❌ Game Over! You got hacked!");
};


  // Score update
  const handleGameOver = async (msg) => {
    clearInterval(timerRef.current);
    setMessage(msg);
    setIsGameOver(true);

    const playerWon = msg.trim().startsWith("🎉");

    if (!playerWon) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.rpc("increase_score", {
      user_id: user.id,
      points: 100
    });

    console.log("RPC data:", data);
    console.log("RPC error:", error);

    if (error) {
      console.error("Score update failed:", error);
    } else {
      console.log("Score updated successfully");
    }
  };



  const handleHint = () => {
    soundManager.play("click");
    if (!isGameOver) navigate("/hint");
  };

  const handleNewGame = () => {
    soundManager.play("click");

    const gameKeys = [
      "ciphercore_grid",
      "ciphercore_colors",
      "ciphercore_activeRow",
      "ciphercore_activeCol",
      "ciphercore_lives",
      "ciphercore_countdown",
      "ciphercore_totalTime",
      "ciphercore_hint_solved",
      "ciphercore_autofill_letter"
    ];

    gameKeys.forEach((key) => localStorage.removeItem(key));

    window.location.reload();
  };


  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#000814] text-white overflow-hidden outline-none"
    >


      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.13] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,150,255,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,150,255,0.25) 1px, transparent 1px)
          `,
            backgroundSize: "70px 70px",
            animation: "gridMove 35s linear infinite",
          }}
        />
      </div>

      {/* Floating neon particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 18}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glow Orbs */}
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Large Earth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <img
          src={Earth}
          alt="Earth"
          className="w-[480px] h-[480px] object-contain drop-shadow-[0_0_40px_rgba(0,255,255,0.4)]"
        />
      </div>

      {/* TOP BAR — Player + Timer */}
      <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <img src={User} alt="User" className="w-9 h-9 object-contain" />
        </div>
        <div className="leading-tight">
          <p className="font-semibold tracking-wider">{playerName}</p>
          <p className="text-xs text-gray-400">{playerTag}</p>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 flex items-center space-x-6">
        <div className="text-right">
          <p className="text-cyan-300 text-lg tracking-wide">⏳ {countdown}s</p>
          <p className="text-red-400 text-sm tracking-wide">❤️ {lives} Lives</p>
        </div>
        <img
          src={Bulb}
          alt="Hint"
          onClick={handleHint}
          className="w-9 h-9 cursor-pointer hover:brightness-125 transition"
        />
      </div>

      {/* MAIN GAME CONTAINER */}
      <main className="relative z-10 w-full max-w-xl px-8 py-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.25)]">
        <h1
          className="text-4xl mb-8 tracking-widest text-center font-bold"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,204,255,0.4)",
          }}
        >
          CipherCore
        </h1>

        {!solution ? (
          <p className="text-cyan-300 text-center text-sm">Loading word...</p>
        ) : (
          <div className="w-full bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-3 mb-3">
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
                    className={`w-14 h-14 text-center rounded-lg border border-white/30 text-2xl uppercase tracking-widest font-bold ${colors[rowIndex][colIndex]} backdrop-blur-sm focus:outline-none`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* New Game */}
        <button
          onClick={handleNewGame}
          className="mt-8 w-full py-3 text-lg tracking-widest rounded-md border border-cyan-400/40 text-white bg-black/20 backdrop-blur-sm hover:border-cyan-300 hover:shadow-[0_0_15px_#00bfff] transition-all"
        >
          NEW GAME
        </button>

        {/* Main Menu */}
        <Link
          to="/MainMenu"
          onClick={() => soundManager.play("click")}
          className="mt-6 w-full block py-3 text-lg tracking-widest rounded-md border border-cyan-400/40 text-white text-center bg-black/20 backdrop-blur-sm hover:border-cyan-300 hover:shadow-[0_0_15px_#00bfff] transition-all"
        >
          MAIN MENU
        </Link>

        {message && (
          <p className="mt-6 text-cyan-300 text-center text-sm">{message}</p>
        )}

        <p className="mt-10 text-xs text-center text-gray-500">© 2025 CipherCore</p>
      </main>

      {/* Animations */}
      <style jsx>{`
      @keyframes gridMove {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(70px, 70px);
        }
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0.25;
        }
        50% {
          transform: translateY(-25px) translateX(15px) scale(1.3);
          opacity: 0.6;
        }
      }
    `}</style>
    </div>
  );

};

export default GameUI;
