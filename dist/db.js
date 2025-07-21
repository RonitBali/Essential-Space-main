"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Model = mongoose_1.default.model;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
});
exports.UserModel = Model("ronitbali", userSchema);
