const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token =  req.header("x-auth-token");
    
    try {
        const decode = jwt.verify(token, config.get("myKey"));
        req.body = decode;
        next();
    } catch (err) {
        res.status(401).send("Invalid");
    }
}