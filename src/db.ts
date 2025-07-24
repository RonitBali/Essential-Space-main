import mongoose from "mongoose";
import { ref } from "process";

const Schema = mongoose.Schema;
const Model = mongoose.model;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});


const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});



const conTentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true, unique:true},
  title:{type: String, required:true},
  tags:[{type: Schema.Types.ObjectId,ref:'Tag'}],
  userId:{type: Schema.Types.ObjectId , ref:"User" , required:true}
})



const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserModel = Model("User", userSchema);
export const TagModel = Model("Tag",tagSchema);
export const ContentModel = Model("Content",contentSchema);
export const LinkModel = Model("Link",linkSchema);
