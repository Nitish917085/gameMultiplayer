const { createServer } = require("http");
const { Server } = require("socket.io");
const { mongooseConnect } = require("./config/mongooseConfig");
const express = require("express");
const routes =  require("./routes")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { gameControllers } = require("./routes/gameControllers");

const app = express();

const corsOrigin ={
  origin:['http://localhost:5173','https://game-multiplayer-nine.vercel.app'], 
  credentials:true,            
  optionSuccessStatus:200
}

app.use(cors(corsOrigin))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",routes)

const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:['http://localhost:5173','https://game-multiplayer-nine.vercel.app']
  }
});

mongooseConnect()

io.on("connection", (socket) => {
  gameControllers(socket,io)
});


const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, ()=> console.log("server started at ",PORT))