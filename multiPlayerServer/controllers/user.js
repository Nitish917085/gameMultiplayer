var jwt = require('jsonwebtoken');
const User = require("../model/User");
const Room = require("../model/Room");

const userRegistration = async (req, res) => {
    try {
        if (await User.findOne({ userName: req.body.userName }))
            return res.status(201).json({ error: "This username already exist" })
        if (await User.findOne({ email: req.body.email }))
            return res.status(201).json({ error: "This email already registered" })

        const user = await User.create({
            userName: req.body.userName,
            nickName: req.body.nickName,
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(200).json({ error: "You are registered successfully, Please login" })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const userLogin = async (req, res) => {
    console.log("login")
    try {
        const user = await User.findOne({ userName: req.body.userName }, 'userName password nickName');
        if (!user)
            return res.status(201).json({ error: "Yor are not registered please Register YourSelf" });
        if (user.password != req.body.password)
            return res.status(201).json({ error: "Wrong credentials" })

        const token = jwt.sign({ userName: req.body.userName, password: req.body.password }, process.env.JWT_SECRET)
        return res.status(200).json({ userName: user.userName, nickName: user.nickName, token: token })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}



const createRoom= async (req, res) => {
    console.log("creataaaa")

    //Generating unique id for each room
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'];

    let result = "";
    for (let index = 0; index < 5; index++) {
        result += alphabet[Math.floor(Math.random() * 10000) % 25];
    }

    //Saving newly creted roomt to database
    const room = new Room({ uID: result, noOfUser: 1 });
    room.save().then(() => {
        console.log('room created', result);
    }).catch((err) => {
        console.log('err creating room',err);
    })
    
    res.json(result);
}

const joinRoom = async (req, res) => {
    console.log('req reciveed');

    //check if the room which this exist or not
    const room_id = req.body.room_id;
    const oyo_room = await Room.findOne({ uID: room_id })
        .catch((err) => {
            console.log('error occured while checking room',err)
        });


    if (oyo_room) {
        // check if room has less than 2 user
        if (oyo_room.noOfUser < 2) {

            // increase no of user
            oyo_room.noOfUser++;
            const doc = await oyo_room.save();

            res.status(200).json({doc});
        } else {
            //Room is full
            res.status(200).json({ err: "Room is Full can't join " })
        }
    } else {
        res.status(200).json({ err: "Enter Valid Room ID"})
    }
}


module.exports = {userRegistration, userLogin,createRoom,joinRoom ,};