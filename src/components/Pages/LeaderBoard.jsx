import React, { useEffect, useState } from "react";
import Earth from "../../assets/Earth.png";
import UserIcon from "../../assets/User.png";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const LeaderBoard = () => {
  //________________________________________________________________________
  //state for players
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Current user info
  const [currentUser, setCurrentUser] = useState({
    username: "Guest",
    id: "0000",
  });

  // Fetch logged-in user info
  const fetchCurrentUser = async () => {
    const { data: authData } = await supabase.auth.getUser();

    const loggedUser = authData?.user;

    if (!loggedUser) {
      setCurrentUser({ username: "Guest", id: "0000" });
      return;
    }

    // Fetch user data from DB
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .eq("email", loggedUser.email)
      .single();

    if (error || !data) {
      setCurrentUser({ username: "Guest", id: "0000" });
    } else {
      setCurrentUser({
        username: data.username,
        id: data.id.toString().padStart(4, "0"), // Convert 1 → 0001
      });
    }
  };

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username, score")
        .order("score", { ascending: false });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
      } else if (!data || data.length === 0) {
        console.warn("No data returned from Supabase");
      } else {
        setPlayers(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchCurrentUser();
  }, []);

 return (
  <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden">

    {/* Background Layers */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#001122] via-[#000a18] to-black opacity-90" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.25)_0%,rgba(0,0,0,0.95)_70%)] pointer-events-none" />

    {/* HEADER TITLE */}
    <header className="w-full text-center mt-10 z-20">
      <h1 className="text-5xl tracking-[0.3em] drop-shadow-[0_0_15px_#00eaff]">
        LEADERBOARD
      </h1>
    </header>

    {/* CURRENT USER BOX */}
    <div className="w-full max-w-[90%] bg-white/5 border border-white/10 rounded-xl mt-10 p-4 flex items-center gap-4 backdrop-blur-lg z-20 shadow-[0_0_20px_rgba(0,200,255,0.2)]">
      <div className="w-12 h-12 border border-cyan-400 rounded-full flex justify-center items-center overflow-hidden">
        <img src={UserIcon} className="w-10 h-10" />
      </div>

      <div>
        <p className="text-xl tracking-widest">{currentUser.username}</p>
        <p className="text-sm text-gray-400">#{currentUser.id}</p>
      </div>
    </div>

    {/* TABLE CONTAINER */}
    <main className="relative w-full max-w-[90%] mt-8 z-20">

      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)]">

        {/* TABLE HEADER */}
        <div className="flex justify-between px-2 text-cyan-300 text-lg font-semibold border-b border-cyan-500/30 pb-3">
          <p className="w-1/6 text-center">Rank</p>
          <p className="w-3/6 text-center">Player</p>
          <p className="w-1/6 text-center">Score</p>
        </div>

        {/* TABLE ROWS */}
        {loading ? (
          <p className="text-center text-gray-400 py-6">Loading…</p>
        ) : (
          players.map((player, index) => (
            <div
              key={index}
              className={`flex justify-between text-lg items-center my-2 py-3 rounded-lg transition-all ${
                index === 0
                  ? "bg-cyan-500/20 border border-cyan-300/40 shadow-[0_0_15px_#00eaff]"
                  : "hover:bg-white/10"
              }`}
            >
              <p className="w-1/6 text-center">{index + 1}</p>
              <p className="w-3/6 text-center tracking-wider">{player.username}</p>
              <p className="w-1/6 text-center">{player.score}</p>
            </div>
          ))
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-5 mt-10 w-full">

        <Link
          to="/game"
          className="flex-1 py-3 text-xl tracking-widest border border-[#00eaff] rounded-xl text-center hover:bg-[#00eaff] hover:text-black transition-all shadow-[0_0_15px_#00eaff]"
        >
          PLAY AGAIN
        </Link>

        <Link
          to="/MainMenu"
          className="flex-1 py-3 text-xl tracking-widest border border-[#00eaff] rounded-xl text-center hover:bg-[#00eaff] hover:text-black transition-all shadow-[0_0_15px_#00eaff]"
        >
          MENU
        </Link>

      </div>

      <p className="text-center mt-10 text-xs text-gray-400">© 2025 CipherCore</p>
    </main>
  </div>
);

};

export default LeaderBoard;
