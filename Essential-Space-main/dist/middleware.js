"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_PASSWORD;
const userMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    //   const token = req.headers.authorization;
    //@ts-ignore
    const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.userId; // decoded id = yash
        next();
    }
    else
        res.status(403).json({
            message: "you are not logged in"
        });
};
exports.userMiddleware = userMiddleware;
