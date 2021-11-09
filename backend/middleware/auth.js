const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = JSON.parse(req.headers.authorization.split(' ')[1]);
    try {
        const decodedToken = jwt.verify(token, 'secret');
        const userId = decodedToken.userId;
        console.log(decodedToken);
        console.log(req.body.userId);
        if (req.body.userId == undefined || req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée" });
        console.log(error);
    } 
};