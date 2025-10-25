import React from "react";
import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/Pages/MainMenu";
import Login from "./components/Pages/Login";
import Signin from "./components/Pages/Signin";
import Leaderboard from "./components/Pages/LeaderBoard";
import Game from "./components/Pages/GameUI";
import HintPage from "./components/Pages/HintPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/game" element={<Game />} />
      <Route path="/hint" element={<HintPage />} />
    </Routes>
  );
};

export default App;
