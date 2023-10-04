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


import SinglePlayerCheckers from "./Games/Checkers/SinglePlayer/CheckerSinglePlayer";
import CommingSoon from "./Common/CommingSoon";
import TicTacToeMultiPlayerConfig from "./Games/TicTacToe/MultiPlayer/Pages/TicTacToeMultiPlayerConfig";
import TicTacToeMultiPlayerHome from "./Games/TicTacToe/MultiPlayer/Pages/TicTacToeMultiPlayerHome";
import CheckerSinglePlayer from "./Games/Checkers/SinglePlayer/CheckerSinglePlayer";
import CheckersMultiPlayerConfig from "./Games/Checkers/MultiPlayer/Pages/CheckersMultiPlayerConfig";
import CheckersMultiPlayerHome from "./Games/Checkers/MultiPlayer/Pages/CheckersMultiPlayerHome";



function App() {
  const user = useSelector((state) => state.user)

  return (
    <>
      <Router>
      {user.userName &&  <NavBar />}
        <Routes>
          <Route exact path="/" element={<LogReg />} />
          <Route exact path="/home" element={<Home />} /> 

          //Tic Tac Toe
          <Route exact path="/TicTacToeSinglePlayer" element={<CommingSoon/>}/>
          <Route exact path="/TicTacToeMultiPlayerHome" element={<TicTacToeMultiPlayerHome/>}/>  
          <Route exact path="/TicTacToeMultiPlayerConfig" element={<TicTacToeMultiPlayerConfig/>}/> 

          //Checker Routes
          <Route exact path="/CheckerSinglePlayer" element={<CheckerSinglePlayer/>}/>
          <Route exact path="/CheckersMultiPlayerConfig" element={<CheckersMultiPlayerConfig/>}/>  
          <Route exact path="/CheckersMultiPlayerHome" element={<CheckersMultiPlayerHome/>}/> 
          //Chess Routes
          <Route exact path="/ChessSinglePlayer" element={<CommingSoon/>}/>
          <Route exact path="/ChessMultiPlayerConfig" element={<CommingSoon/>}/>
          <Route exact path="/ChessMultiPlayerHome" element={<CommingSoon/>}/>

          //Snake Routes
          <Route exact path="/SnakeSinglePlayer" element={<CommingSoon/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
