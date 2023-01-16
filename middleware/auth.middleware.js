const jwt = require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decrypt=jwt.verify(token,"victor");
        if(decrypt){
            const userID=decrypt.userID;
            req.body.userID = userID;
            next();
        }else{
            res.send("Login first")
        }
    }else{
        res.send("Login first")
    }
}

module.exports ={auth}