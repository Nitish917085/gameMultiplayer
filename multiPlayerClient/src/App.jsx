import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogReg from "./Pages/Login/LogReg";
import Home from "./Pages/Dashboard/Home";
import NavBar from "./Components/NavBar/NavBar";
import { useSelector } from "react-redux";

import TicTacToePlay from "./Games/Tic Tac Toe/Pages/TicTacPlay";
import Checkers from "./Games/Checkers/SinglePlayer/Checkers";
import TicTackToe from "./Games/Tic Tac Toe/Pages/TicTacToeHome";

function App() {
  const user = useSelector((state) => state.user)

  return (
    <>
      <Router>
      {user.userName &&  <NavBar />}
        <Routes>
          <Route exact path="/" element={<LogReg />} />
          <Route exact path="/home" element={<Home />} /> 
          <Route exact path="/tictactoe" element={<TicTackToe/>}/>  
          <Route exact path="/tictactoeplay" element={<TicTacToePlay/>}/>  
          <Route exact path="/checkers" element={<Checkers/>}/>            
        </Routes>
      </Router>
    </>
  );
}

export default App;
