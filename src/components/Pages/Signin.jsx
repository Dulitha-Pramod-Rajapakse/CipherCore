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
  <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden">

    {/* Background layers */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#001122] via-[#000a18] to-black opacity-90" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.25)_0%,rgba(0,0,0,0.95)_70%)] pointer-events-none" />

    {/* TITLE */}
    <h1 className="text-5xl tracking-[0.3em] mt-10 z-20 drop-shadow-[0_0_15px_#00eaff]">
      SIGN UP
    </h1>

    {/* FORM WRAPPER */}
    <form
      onSubmit={handleSignup}
      className="relative z-20 w-full max-w-[90%] md:max-w-[450px] mt-10 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)] flex flex-col items-center"
    >

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-3 mb-5 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 text-lg tracking-wider focus:outline-none focus:shadow-[0_0_10px_#00eaff]"
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 mb-5 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 text-lg tracking-wider focus:outline-none focus:shadow-[0_0_10px_#00eaff]"
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 mb-6 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 text-lg tracking-wider focus:outline-none focus:shadow-[0_0_10px_#00eaff]"
        required
      />

      {/* CREATE ACCOUNT BUTTON */}
      <button
        type="button"
        onClick={handleSignup}
        className="w-full py-3 text-xl tracking-widest border border-[#00eaff] rounded-md text-white text-center transition-all duration-300 hover:bg-[#00eaff] hover:text-black hover:shadow-[0_0_15px_#00eaff]"
      >
        CREATE ACCOUNT
      </button>

      {/* MENU BUTTON */}
      <div className="flex flex-col w-full mt-8">
        <Link
          to="/MainMenu"
          className="w-full py-3 text-xl tracking-widest border border-[#00bfff] rounded-md text-center text-white transition-all duration-300 hover:shadow-[0_0_15px_#00bfff,0_0_25px_#00bfff] hover:border-[#00ffff]"
        >
          MENU
        </Link>
      </div>

      {/* LOGIN LINK */}
      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-[#00eaff] hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
);

};

export default Signin;
