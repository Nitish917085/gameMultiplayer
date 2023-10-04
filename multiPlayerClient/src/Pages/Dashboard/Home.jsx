import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const cookie = Cookies.get("userToken")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  var [response, setResponse] = useState({})


  const handleTicTackToe = () => {
    navigate('/tictactoe')
  }
  const handleCheckers = () => {
    navigate('/checkers')
  }
  const handleSnake = () => {

  }
  const handleChess = () => {

  }
  useEffect(() => {
  }, [response])

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="homePage">

        <div className="gameConatiner">
          <div className="gameContainerSubClass">
            <div className="gameCards" onClick={() => handleTicTackToe()}>
              <img className="gameImage" src="https://media.istockphoto.com/id/91227309/photo/crosses-and-noughts-game.jpg?s=1024x1024&w=is&k=20&c=aPxTPMOoIov7CqZsTWHnw19TmdJwG-RjdLXLs-heQRE=" />
              <div className="gameTitle"> TicTacToe</div>
            </div>

            <div className="gameCards" onClick={() => handleCheckers()}>
              <img className="gameImage" src="https://images.unsplash.com/photo-1610232826230-e5e6c6a1efef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1510&q=80" />
              <div className="gameTitle"> Checkers</div>
            </div>

          </div>
          <div className="gameContainerSubClass">
            <div className="gameCards" onClick={() => handleSnake()}>
              <img className="gameImage" src="https://media.istockphoto.com/id/1343390045/photo/diy-summer-craft-for-kids-how-to-make-serpent-from-plastic-bottle-cap-homemade-handicraft.jpg?s=1024x1024&w=is&k=20&c=o1NNgs24YwsZ__7ApbC-5GXeChm8IeUf3pTpwtELtp8=" />
              <div className="gameTitle snake"> Snake</div>

            </div>

            <div className="gameCards" onClick={() => handleChess()}>
              <img className="gameImage" src="https://media.istockphoto.com/id/1395539260/photo/chess-game-competition-business-concept-business-competition-concept-fighting-and-confronting.jpg?s=1024x1024&w=is&k=20&c=vG6NBBhxsAn1m_ZjnpJxmiRJ6uqylR98rpb-t1H_OLc=" />
              <div className="gameTitle chess"> Chess</div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
