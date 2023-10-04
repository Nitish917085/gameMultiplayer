const Room = require("../model/Room");

const game_join = async (socket,io) => {

    socket.on('join', async room_id => {
        console.log('user joined', room_id);
        socket.join(room_id);

        const oyo_room = await Room.findOne({ uID: room_id })
            .catch((err) => {
                console.log('error occured while checking room', err)
            });

        if (oyo_room && oyo_room.noOfUser === 2) {
            io.to(room_id).emit('youCanPLayNow');
        }
    })
}

const checkersGameJoin = async (socket,io) => {

    socket.on('joinCheckers', async room_id => {
        console.log('user joined', room_id);
        socket.join(room_id);

        const oyo_room = await Room.findOne({ uID: room_id })
            .catch((err) => {
                console.log('error occured while checking room', err)
            });

        if (oyo_room && oyo_room.noOfUser === 2) {
            io.to(room_id).emit('youCanPLayNow');
        }
    })
}


const onClickSquare = async (socket,io) => {
    socket.on('squareClicked', ({ i, name, user_id, room_id }) => {
        const click = {
            i,
            name,
            user_id,
            room_id,
        };
        console.log(`${name} clicked ${i} square in room ${room_id}`);
        io.to(room_id).emit('squareClickedReceived', click);
    })
}

const palyAgian = async (socket,io) => {
    socket.on('playAgain', room_id => {
        io.to(room_id).emit('playAgainReceived');
    })
}

const checkersGameUpdate =async(socket,io)=>{
    socket.on('onPlayersMove',(data)=>{
        io.to(data.room_id).emit('onPlayerMoveRecieved',data)
    })
}

const chekersGameWins = async(socket,io)=>{
    socket.on('checkersPlayersWins',data=>{
            socket.emit('checkersPlayersWins',data)
    })
}

const checkersPlayAgain=async(socket,io)=>{
    socket.on('checkersPlayAgain',()=>{
        socket.emit('checkersPlayAgain')
    })
}

module.exports = { game_join,palyAgian,onClickSquare,checkersGameJoin,checkersGameUpdate,chekersGameWins,checkersPlayAgain }