const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        console.log("TOKEN RECEIVED:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED USER:", decoded);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = protect;