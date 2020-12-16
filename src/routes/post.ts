import { Request, Response } from 'express';
import { Router } from 'express';
import User from '../models/User';
import verifyToken from './verifyToken';

const router = Router();

router.get('/', verifyToken, (req: Request, res: Response) => {
    //@ts-ignore
    res.send(req.user);
    //@ts-ignore
    User.findOne({_id: req.user})
})




module.exports = router;