"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access Denied !!!');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //@ts-ignore
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid Token');
    }
}
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map