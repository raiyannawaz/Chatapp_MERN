const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const fetchusers = async (req, res, next) =>{
    try{
        let token = req.header('auth-token');

        let verifyToken = await jwt.verify(token, SECRET_KEY);

        req.id = await verifyToken.id

        next()
    }
    catch(err){
        res.status(404).json(err)
    }
}

module.exports = fetchusers