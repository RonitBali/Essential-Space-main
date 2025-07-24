"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Model = mongoose_1.default.model;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
});
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true }
});
const conTentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const contentSchema = new Schema({
    link: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.UserModel = Model("User", userSchema);
exports.TagModel = Model("Tag", tagSchema);
exports.ContentModel = Model("Content", contentSchema);
exports.LinkModel = Model("Link", linkSchema);
