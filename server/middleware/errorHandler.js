function errHandler(err, req, res, next){
    if(err.name === "InvalidToken" || err.name === "JsonWebTokenError"){ // tambahin jsonerr
        res.status(401).json({message : "Invalid Token" })
    }else if(err.name === 'Forbidden'){
        res.status(403).json({message : "You are not authorize for this action" })
    }else if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ){
        res.status(400).json({message : err.errors[0].message})
    }else if(err.name === "notFound"){
        res.status(404).json({message : 'no medical tracker yet'})
    }else if(err.name === "badRequest"){
        res.status(400).json({message : "Email / Password Required"})
    }else if(err.name === "Unauthorized"){
        res.status(401).json({message : "Email / Password Invalid"})
    }else {
        res.status(500).json({message : "Internal Server Error" })
    }
}

module.exports = errHandler