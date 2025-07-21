import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Model = mongoose.model;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

export const UserModel = Model("User", userSchema);
