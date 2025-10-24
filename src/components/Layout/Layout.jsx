import React from "react";
import Earth from "../../assets/Earth.png";

const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#000814] text-white font-[Jacques_Francois_Shadow] overflow-hidden animate-fadeIn">
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-[#001e40] to-[#000814] opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.28)_0%,rgba(0,0,0,0.92)_68%)] pointer-events-none" />

      {/* Earth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <img
          src={Earth}
          alt="Earth"
          className="w-[440px] h-[440px] object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.35)]"
        />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-[480px] flex flex-col items-center justify-center px-6 py-10 text-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-500 z-10">
        © 2025 CipherCore
      </footer>
    </div>
  );
};

export default Layout;
