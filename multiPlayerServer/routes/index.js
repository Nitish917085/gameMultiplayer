const { userRegistration, userLogin, createRoom, joinRoom} = require("../controllers/user");
const router = require("express").Router();
const { verifyTokenAutoLogin, verifyToken } = require("../middleware/tokenAuth");


router.post('/userRegistration',userRegistration)
router.post('/userLogin',verifyTokenAutoLogin, userLogin)
router.get('/create_room',createRoom)
router.post('/join_room',joinRoom)

module.exports = router;
