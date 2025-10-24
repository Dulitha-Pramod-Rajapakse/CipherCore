import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Login = () => {
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
        placeholder="Username"
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-64 px-4 py-2 mb-6 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />

      <Link
        to="/game"
        className="w-64 py-2 text-center border border-[#00bfff] rounded-md text-white tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00bfff]"
      >
        LOGIN
      </Link>

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
