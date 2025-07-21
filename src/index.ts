import express from 'express';
import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from './db';
import mongoose from 'mongoose';
const app=express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://yashsrivasta7a:1v7s56CxMmWzZyQM@essesntialspacecluster.3ak31su.mongodb.net/EssentialSpaces"
);



const zodSignup = z.object({
    username:z.string().min(6,"Username must have 6 characters"),
    pass:z.string().regex(
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
    message:"Password must have 8 charac and should include uppercase , lowercase , special charac & a number"}
    )
})

app.post('/api/v1/signup', async (req, res) => {
    try {
        const { username, pass } = zodSignup.parse(req.body);
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(pass, 10);
        await UserModel.create({ username, pass: hashedPass });
        res.status(201).json({ message: "Signed Up" });
    } catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
});

app.post('/api/v1/signin', async (req, res) => {
    try {
        const { username, pass } = zodSignup.parse(req.body);
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(pass, user.pass);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ message: "Signed In", token });
    } catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
});

app.get('/api/v1/content',(res,req)=>{

});

app.post('/api/v1/brain/share',(res,req)=>{

});


app.get('/api/v1/brain/:shareLink',(res,req)=>{

});

app.listen(3001);