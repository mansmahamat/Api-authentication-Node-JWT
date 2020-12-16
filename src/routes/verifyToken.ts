import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

function verifyToken (req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied !!!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //@ts-ignore
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

export default verifyToken;