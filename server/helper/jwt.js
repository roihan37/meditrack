const jwt = require('jsonwebtoken');

module.exports ={
    createToken : (payload)=>{
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    },
    verifyToken : (payload)=>{
        return jwt.verify(payload, process.env.JWT_SECRET_KEY)
    }
}