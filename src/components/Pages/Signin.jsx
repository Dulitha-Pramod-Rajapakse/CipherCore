import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Signin = () => {
  return (
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
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-64 px-4 py-2 mb-4 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-64 px-4 py-2 mb-6 bg-transparent border border-[#00bfff] rounded-md text-white placeholder-gray-400 focus:outline-none"
      />

      <Link
        to="/main"
        className="w-64 py-2 text-center border border-[#00bfff] rounded-md text-white tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_#00bfff]"
      >
        CREATE ACCOUNT
      </Link>

      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-[#00bfff] hover:underline">
          Login
        </Link>
      </p>
    </Layout>
  );
};

export default Signin;
