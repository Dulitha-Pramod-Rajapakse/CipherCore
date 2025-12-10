import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENT_GAME_WORD } from "../Pages/GameUI";

const HintPage = () => {
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://marcconrad.com/uob/heart/api.php")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setSolution(data.solution);
      })
      .catch(() => setMessage("Failed to load hint from Heart API"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === solution) {
      localStorage.setItem("ciphercore_hint_solved", "true");

      if (CURRENT_GAME_WORD) {
        const randomIndex = Math.floor(Math.random() * CURRENT_GAME_WORD.length);
        const letter = CURRENT_GAME_WORD[randomIndex];
        localStorage.setItem("ciphercore_autofill_letter", letter);
      }

      setMessage("✅ Correct! Returning to game...");
      setTimeout(() => navigate("/game"), 1500);
    } else {
      setMessage("❌ Wrong answer, try again!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000d1f] via-[#001831] to-[#000814] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.25)_0%,rgba(0,0,0,0.9)_70%)]" />

      {/* Main Container */}
      <div className="relative w-full max-w-3xl mt-20 mb-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-[0_0_35px_rgba(0,200,255,0.25)] px-8 py-12 text-center z-10">
        
        <h1
          className="text-4xl mb-10 tracking-widest text-white"
          style={{
            textShadow:
              "0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(0,204,255,0.5)",
          }}
        >
          CipherCore Hint
        </h1>

        {/* Puzzle Image */}
        {question ? (
          <img
            src={question}
            alt="Puzzle"
            className="mx-auto w-72 h-72 object-contain mb-10 rounded-xl border border-white/20 shadow-[0_0_25px_rgba(0,200,255,0.25)]"
          />
        ) : (
          <p className="text-gray-300 mb-10">Loading puzzle...</p>
        )}

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-48 text-center py-2 rounded-md bg-white/10 border border-white/20 text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-widest"
          />

          <button
            type="submit"
            className="w-40 py-2 rounded-md border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all duration-300 tracking-widest shadow-[0_0_15px_rgba(0,200,255,0.25)]"
          >
            SUBMIT
          </button>
        </form>

        {message && (
          <p className="mt-4 text-cyan-300 text-sm tracking-wide">{message}</p>
        )}

        <button
          onClick={() => navigate("/game")}
          className="mt-10 text-sm text-gray-400 underline hover:text-cyan-300 transition"
        >
          Back to Game
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6 mb-6">© 2025 CipherCore</p>
    </div>
  );
};

export default HintPage;
