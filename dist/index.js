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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("./middleware");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb+srv://yashsrivasta7a:1v7s56CxMmWzZyQM@essesntialspacecluster.3ak31su.mongodb.net/EssentialSpace");
const key = process.env.JWT_PASSWORD || "default_jwt_secert";
const zodSignup = zod_1.z.object({
    username: zod_1.z.string().min(6, "Username must have 6 characters"),
    pass: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must have 8 charac and should include uppercase , lowercase , special charac & a number"
    })
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, pass } = zodSignup.parse(req.body);
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPass = yield bcrypt_1.default.hash(pass, 10);
        const newUser = yield db_1.UserModel.create({ username, pass: hashedPass });
        res.status(201).json({ message: "Signed Up" });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, pass } = zodSignup.parse(req.body);
        const user = yield db_1.UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(pass, user.pass);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const key = process.env.JWT_PASSWORD || "default_jwt_secert";
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, key, { expiresIn: "24h" });
        res.json({ message: "Signed In",
            token
        });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added"
    });
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId,
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
}));
app.post('/api/v1/brain/share', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        const hash = crypto_1.default.randomBytes(8).toString("hex");
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({
                //@ts-ignore
                userId: req.userId,
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            yield db_1.LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash,
            });
            res.json({
                message: "/share/" + hash
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId,
            });
            res.json({
                message: "Link Deleted"
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
}));
app.get('/api/v1/brain/:shareLink', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash, // security 
    });
    if (!link) {
        res.status(411).json({
            message: "Incorrect Input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link === null || link === void 0 ? void 0 : link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link === null || link === void 0 ? void 0 : link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
    }
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3001, () => {
    console.log("Server Chal Gya");
});
