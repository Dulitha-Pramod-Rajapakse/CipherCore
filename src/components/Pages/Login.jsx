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
      <h1
        className="text-4xl mb-10 tracking-widest"
        style={{
          textShadow:
            "0 0 6px rgba(255,255,255,0.8), 0 0 16px rgba(0,204,255,0.4)",
        }}
      >
        Login
      </h1>

      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-64 px-4 py-2 mb-6 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />

      <button
        onClick={handleLogin}
        className="w-64 py-2 text-center border border-[#00bfff] rounded-md text-white tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00bfff]"
      >
        LOGIN
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signin" className="text-[#00bfff] hover:underline">
          Sign Up
        </Link>
      </p>

      <Link
        to="/game"
        className="mt-8 w-64 py-2 text-center border border-[#00bfff] rounded-md text-white tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00bfff]"
      >
        PLAY AS GUEST
      </Link>
    </Layout>
  );
};

export default Login;
