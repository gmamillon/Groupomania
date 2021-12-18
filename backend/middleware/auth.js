const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = JSON.parse(req.headers.authorization.split(' ')[1]);
    try {
        const decodedToken = jwt.verify(token, 'secret');
        req.body.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
        console.log(error);
    } 
};