import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/game");
    }
  };

return (
  <Layout>
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-white font-sans overflow-hidden">

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridMove 30s linear infinite",
          }}
        />
      </div>

      {/* Soft Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-20 w-full max-w-md px-8 py-10 bg-white/5 backdrop-blur-md rounded-2xl border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]">

        <h1 className="text-4xl mb-10 tracking-widest font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
          LOGIN
        </h1>

        {/* Email */}
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-4 bg-transparent border border-blue-500/40 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 bg-transparent border border-blue-500/40 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          LOGIN
        </button>

        {/* SIGN UP */}
        <p className="mt-6 text-sm text-blue-200/70 text-center">
          Don’t have an account?{" "}
          <Link to="/signin" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* GUEST */}
        <Link
          to="/game"
          className="mt-8 w-full block py-3 text-lg border border-blue-500/40 rounded-md text-blue-200 text-center hover:border-cyan-400 hover:bg-blue-500/10 transition-all"
        >
          PLAY AS GUEST
        </Link>

        {/* MENU */}
        <div className="flex gap-4 mt-8 w-full">
          <Link
            to="/MainMenu"
            className="flex-1 py-2 text-lg tracking-widest border border-blue-500/40 rounded-md text-blue-200 text-center transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            MENU
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(15px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  </Layout>
);

};

export default Login;
