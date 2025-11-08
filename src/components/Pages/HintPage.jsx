import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      // Store hint 
      localStorage.setItem("ciphercore_hint_solved", "true");
      setMessage("✅ Correct! Returning to game...");
      setTimeout(() => navigate("/game"), 1500);
    } else {
      setMessage("❌ Wrong answer, try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] text-white font-[Jacques_Francois_Shadow] px-6 text-center">
      <h1 className="text-4xl mb-6 tracking-widest text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">
        CipherCore Hint
      </h1>

      {question ? (
        <img
          src={question}
          alt="Heart Puzzle"
          className="w-72 h-72 object-contain mb-6 border border-white/20 rounded-xl shadow-lg"
        />
      ) : (
        <p className="text-gray-400 mb-6">Loading puzzle...</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="w-48 text-center py-2 rounded-md bg-white/10 border border-white/20 text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="py-2 px-6 rounded-md border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-cyan-300 text-sm">{message}</p>}

      <button
        onClick={() => navigate("/game")}
        className="mt-10 text-sm text-gray-400 underline"
      >
        Back to Game
      </button>
    </div>
  );
};

export default HintPage;
