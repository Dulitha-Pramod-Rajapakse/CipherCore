import React from "react";
import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/Pages/MainMenu";
import Login from "./components/Pages/Login";
import Signin from "./components/Pages/Signin";
import Leaderboard from "./components/Pages/LeaderBoard";
import Game from "./components/Pages/GameUI";

const App = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainMenu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default App;
