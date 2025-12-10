import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { soundManager } from "../../utils/soundManager";



const MainMenu = () => {
  //play sound
  useEffect(() => {
    const unlockAudio = async () => {
      await soundManager.unlock();
      soundManager.startBackground();
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => window.removeEventListener("click", unlockAudio);
  }, []);
  
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-sans overflow-hidden">

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }} />
      </div>

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* User Profile */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20 backdrop-blur-md bg-white/5 px-4 py-2.5 rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-all">
        <div className="w-9 h-9 rounded-full border-2 border-blue-400 flex items-center justify-center bg-gradient-to-br from-blue-500/30 to-cyan-500/30">
          <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-12 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24 2xl:gap-32">
          
          {/* Left Side - Branding & Globe */}
          <div className="flex flex-col items-center lg:items-start space-y-10">
            
            {/* Logo/Title */}
            <div className="space-y-2">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CIPHER
                </span>
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CORE
                </span>
              </h1>
              <div className="h-1 w-40 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent rounded-full" />
            </div>

            {/* Central Globe Visualization */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20" />
              <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-spin" style={{ animationDuration: '25s' }} />
              <div className="absolute inset-8 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 rounded-full border border-blue-300/20 animate-spin" style={{ animationDuration: '15s' }} />
              
              {/* Center Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-blue-500/30 via-cyan-500/30 to-blue-600/30 backdrop-blur-sm border border-blue-400/40 shadow-[0_0_60px_rgba(59,130,246,0.4)] flex items-center justify-center group hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] transition-all duration-500">
                  <svg className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 text-blue-300 opacity-90 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 2.25c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.919 17.919 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div className="w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
            <div className="flex flex-col gap-5 lg:gap-6">
              
              {/* Start Mission Button */}
              <Link
              onClick={() => soundManager.play("click")}
                to="/login"
                className="group relative w-full py-5 px-8 text-xl font-semibold tracking-wide overflow-hidden rounded-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                  START MISSION
                </span>
              </Link>

              {/* Leaderboard Button */}
              <Link
              onClick={() => soundManager.play("click")}
                to="/leaderboard"
                className="group relative w-full py-5 px-8 text-xl font-semibold tracking-wide border-2 border-blue-500/40 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/60 backdrop-blur-sm transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3 text-blue-200 group-hover:text-blue-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                  LEADERBOARD
                </span>
              </Link>

              {/* Exit Button */}
              <Link
                to="/login"
                className="group relative w-full py-5 px-8 text-xl font-semibold tracking-wide border-2 border-red-500/40 rounded-xl bg-red-500/5 hover:bg-red-500/10 hover:border-red-400/60 backdrop-blur-sm transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3 text-red-400 group-hover:text-red-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  EXIT
                </span>
              </Link>
            </div>

            {/* Footer Info */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-sm text-blue-300/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <span className="font-medium">SYSTEM ONLINE</span>
              </div>
              <span className="text-blue-400/40">•</span>
              <span>© 2025 CIPHERCORE</span>
            </div>
          </div>

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
  );
};

export default MainMenu;