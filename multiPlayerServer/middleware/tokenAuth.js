var jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyToken = (req, res, next) => {
    
    const cookie = req.body.cookie
    console.log("veryCookie",req.body)

    if (cookie) {
        jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {

            console.log(decoded,req.body)
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(201).json({ error: "You are not authenticated" })
            } else {
                if(decoded.userName==req.body.userName){
                    req.body={...req.body}
                    console.log("pass")
                    next()
                }
                else{
                    console.log("fail")
                    return res.status(201).json({ error: "You are not authenticated" })
                }
            }
        });
      
      }else{
        return res.status(201).json({ error: "You are not authenticatedd" })
      }
}

const verifyTokenAutoLogin = (req, res, next) => {
    console.log("authCall")
    
    const cookie = req.body.cookie

    if (cookie) {
        jwt.verify(cookie, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(204).json({ error: "You are not authenticated" })
            } else {
                try {
                    const user = await User.findOne({userName:decoded.userName},'userName password nickName');
                        console.log("autoLogin",decoded,req.body)
                    if(decoded.userName != user.userName)
                        return res.status(204).json({}) 
                    if(decoded.password != user.password)
                      return res.status(204).json({}) 
            
                    const token= jwt.sign({userName:user.userName,password:user.password},process.env.JWT_SECRET)    
                    return res.status(200).json({userName:user.userName,nickName:user.nickName,token:token})        
            
                } catch (err) {
                    return res.status(204).json({ error: err.message });
                }
            }
        });
      
      }else{
        next();
      }
}
module.exports = { verifyToken,verifyTokenAutoLogin }