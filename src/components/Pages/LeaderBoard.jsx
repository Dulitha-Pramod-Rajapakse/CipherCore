import React from "react";
import Earth from "../../assets/Earth.png";
import User from "../../assets/User.png";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const players = [
    { id: 1, name: "DARK_KNIGHT", score: 980 },
    { id: 2, name: "LUNA_STRIKE", score: 910 },
    { id: 3, name: "CYBER_FOX", score: 890 },
    { id: 4, name: "OMEGA_404", score: 860 },
    { id: 5, name: "VOID_RUNNER", score: 820 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center w-full bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-[#001e40] to-[#000814] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.28)_0%,rgba(0,0,0,0.92)_68%)] pointer-events-none" />

      {/* Earth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <img
          src={Earth}
          alt="Earth"
          className="w-[440px] h-[440px] object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.35)]"
        />
      </div>

      {/* User */}
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
      <main className="relative z-10 w-full max-w-[480px] flex flex-col items-center px-6 py-10 text-center">
        <h1
          className="text-4xl mb-8 tracking-widest"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,204,255,0.4)",
          }}
        >
          Leaderboard
        </h1>

        {/* Table */}
        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between text-cyan-300 text-sm mb-3 border-b border-cyan-500/30 pb-2">
            <p className="w-1/6 text-center">Rank</p>
            <p className="w-2/3 text-center">Player</p>
            <p className="w-1/6 text-center">Score</p>
          </div>
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`flex justify-between items-center mb-2 py-2 rounded-md transition-all duration-300 ${
                index === 0
                  ? "bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_10px_#00bfff]"
                  : "hover:bg-white/10"
              }`}
            >
              <p className="w-1/6 text-center">{index + 1}</p>
              <p className="w-2/3 text-center tracking-wider">{player.name}</p>
              <p className="w-1/6 text-center">{player.score}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full justify-center">
          <Link
            to="/game"
            className="flex-1 py-2 text-lg tracking-widest border border-[#00bfff] rounded-md text-white text-center transition-all duration-300 hover:shadow-[0_0_10px_#00bfff,0_0_20px_#00bfff] hover:border-[#00ffff]"
          >
            PLAY AGAIN
          </Link>
          <Link
            to="/main"
            className="flex-1 py-2 text-lg tracking-widest border border-[#00bfff] rounded-md text-white text-center transition-all duration-300 hover:shadow-[0_0_10px_#00bfff,0_0_20px_#00bfff] hover:border-[#00ffff]"
          >
            MENU
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-400">© 2025 CipherCore</p>
      </main>
    </div>
  );
};

export default LeaderBoard;
