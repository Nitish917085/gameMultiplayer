const { game_join, onClickSquare, palyAgian } = require("../controllers/game_controllers")

const gameControllers=async(socket,io)=>{
    game_join(socket,io)
    onClickSquare(socket,io)
    palyAgian(socket,io)
}

module.exports= {gameControllers}