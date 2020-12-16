"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const verifyToken_1 = __importDefault(require("./verifyToken"));
const router = express_1.Router();
router.get('/', verifyToken_1.default, (req, res) => {
    //@ts-ignore
    res.send(req.user);
    //@ts-ignore
    User_1.default.findOne({ _id: req.user });
});
module.exports = router;
//# sourceMappingURL=post.js.map