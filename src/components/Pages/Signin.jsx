import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { supabase } from "../../supabaseClient";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();

  // Sign up in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  if (!user) {
    alert("Signup failed. Try again.");
    return;
  }

  // Insert user into 'users' table
  const { error: insertError } = await supabase.from("users").insert([
    {
      auth_id: user.id,   // Links this row to auth.users
      username: username,
      email: email,
      score: 0            // initial leaderboard score
    }
  ]);

  if (insertError) {
    alert(insertError.message);
    return;
  }

  // Navigate to login
  navigate("/login");
};


  return (
    <form className="relative min-h-screen flex flex-col items-center justify-center w-full bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden">
      <Layout>
      <h1
        className="text-4xl mb-10 tracking-widest"
        style={{
          textShadow:
            "0 0 6px rgba(255,255,255,0.8), 0 0 16px rgba(0,204,255,0.4)",
        }}
      >
        Sign Up
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-64 px-4 py-2 mb-6 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
        required
      />

      <button
      type="button"
        onClick={handleSignup}
        className="w-64 py-2 text-center border border-[#00bfff] rounded-md text-white tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00bfff]"
      >
        CREATE ACCOUNT
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-[#00bfff] hover:underline">
          Login
        </Link>
      </p>
    </Layout>
    </form>
  );
};

export default Signin;
