"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb+srv://yashsrivasta7a:1v7s56CxMmWzZyQM@essesntialspacecluster.3ak31su.mongodb.net/EssentialSpaces");
const zodSignup = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must have 6 characters"),
    pass: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must have 8 charac and should include uppercase , lowercase , special charac & a number"
    })
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, pass } = zodSignup.parse(req.body); // input
        const hashedPass = yield bcrypt_1.default.hash(pass, 10); // yash -> sa@3asda
        yield db_1.UserModel.create({
            username: username,
            pass: hashedPass
        });
        res.json({
            message: "Signed Up"
        });
    }
    catch (error) {
        res.status(404).json({
            message: "User alsready Exists"
        });
    }
}));
app.post('/api/v1/signin', (res, req) => {
    
});
app.get('/api/v1/content', (res, req) => {
});
app.post('/api/v1/brain/share', (res, req) => {
});
app.get('/api/v1/brain/:shareLink', (res, req) => {
});
app.listen(3001);
