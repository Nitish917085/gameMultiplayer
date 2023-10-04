const { sendOtp, otpVerification, resetPassword } = require("../controllers/resetPassword");
const { userRegistration, userLogin, createRoom, joinRoom} = require("../controllers/user");
const router = require("express").Router();
const { verifyTokenAutoLogin, verifyToken } = require("../middleware/tokenAuth");

router.post('/userRegistration',userRegistration)
router.post('/userLogin',verifyTokenAutoLogin, userLogin)
router.get('/create_room',createRoom)
router.post('/join_room',joinRoom)

router.post('/sendOtp',sendOtp)
router.post('/veryfyOtp',otpVerification)
router.post('/resetPassword',resetPassword)

module.exports = router;
