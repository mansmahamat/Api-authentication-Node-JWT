"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
//Import Route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const mentors = require('./routes/mentors');
const app = express_1.default();
dotenv_1.default.config();
//Connect Db
mongoose_1.default.connect(
//@ts-ignore
process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
})
    .then(() => console.log('DB CONNECTED'))
    .catch((err) => console.log(err));
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
// Route middlewware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api', mentors);
app.listen(process.env.PORT || 5000, () => console.log('App is here'));
//# sourceMappingURL=index.js.map