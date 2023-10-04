const { game_join, onClickSquare, chekersGameWins,palyAgian, checkersGameUpdate, checkersPlayAgain, checkersGameJoin } = require("../controllers/game_controllers")

const gameControllers=async(socket,io)=>{
    game_join(socket,io)
    onClickSquare(socket,io)
    palyAgian(socket,io)
    checkersGameUpdate(socket,io)
    checkersPlayAgain(socket,io)
    chekersGameWins(socket,io)
    checkersGameJoin(socket,io)  
}

module.exports= {gameControllers}