import express, { json } from 'express';
import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from './db';
import mongoose, { Model } from 'mongoose';
import { userMiddleware } from './middleware';
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app=express();

app.use(cors())

app.use(express.json());
const mongoosedb = process.env.mongoose_db;
if (!mongoosedb) {
    throw new Error("Environment variable 'mongoose_db' is not defined.");
}
mongoose.connect(mongoosedb);

const key = process.env.JWT_PASSWORD || "default_jwt_secert";


const zodSignup = z.object({
    username:z.string().min(6,"Username must have 6 characters"),
    pass:z.string().regex(
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
    message:"Password must have 8 charac and should include uppercase , lowercase , special charac & a number"}
    )
})

app.post('/api/v1/signup', async (req, res):Promise<any> =>{
    try {
        const { username, pass } = zodSignup.parse(req.body);
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(pass, 10);
        const newUser = await UserModel.create({ username, pass: hashedPass });
        
        res.status(201).json({ message: "Signed Up" });
    } catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
});

app.post('/api/v1/signin', async (req,res):Promise<any> => {
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

        const key = process.env.JWT_PASSWORD || "default_jwt_secert";

        const token = jwt.sign({ userId: user._id, username:
           user.username }, key,
            { expiresIn: "24h" });
            
        res.json({ message: "Signed In", 
          token
         });
    } catch (error) {
        res.status(400).json({ message: "Invalid input" });
    }
});

app.post('/api/v1/content', userMiddleware,async (req,res)=>{
      const link = req.body.link;
      const title = req.body.title;
      const type = req.body.type;

     await ContentModel.create({  
        link,
        title,
        type,
         //@ts-ignore
        userId: req.userId,
        tags:[]
      })

      res.json({
        message:"content added"
      })
});


app.get('/api/v1/content',userMiddleware , async(req,res)=>{
      //@ts-ignore
      const userId = req.userId;
      const content =  await ContentModel.find({
        userId,    
      }).populate("userId","username")
      res.json({
        content
      })
      
});


app.delete('/api/v1/content',userMiddleware,async (req,res) =>{
      const contentId = req.body.contentId;

      await ContentModel.deleteOne({
       
        _id: contentId,
         //@ts-ignore
        userId:req.userId 
      })
       res.json({
            message:"Deleted"
        })
});

app.post('/api/v1/brain/share',userMiddleware ,async (req,res)=>{
       try {
           const {share} = req.body;
           const hash = crypto.randomBytes(8).toString("hex")
           if(share){

            const existingLink = await LinkModel.findOne({
                //@ts-ignore
                userId:req.userId,
              
            })

            if(existingLink){
               res.json({
                hash: existingLink.hash
               })
               return;
            }
         
            
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash,
            })

            res.json({
               message:"/share/" + hash
            })
           }else{
            await LinkModel.deleteOne({
                //@ts-ignore
                userId:req.userId,
            });
            res.json({
              message:"Link Deleted"
            })
           }
          
       } catch(error) {
          res.status(400).json({ message: "Invalid input" });
       }
       
});


app.get('/api/v1/brain/:shareLink', async(req,res)=>{
      const hash = req.params.shareLink;

      const link = await LinkModel.findOne({
            hash,// security 
      })

      if(!link){
        res.status(411).json({
               message:"Incorrect Input"
        })
        return;
      }
      
      const content = await ContentModel.find({
        userId: link?.userId
      })
    
    
      const user = await UserModel.findOne({
        _id: link?.userId
      })

      if(!user){
        res.status(411).json({
          message:"User not found"
        })
      }
       
      res.json({
        username: user?.username,
        content: content
      })
});

app.patch('/api/v1/brain/update',userMiddleware, async(req,res)=>{
  try {
    const {id, title, link} = req.body;
  
   await ContentModel.updateOne({
    _id:id,
    //@ts-ignore
    userId: req.userId
   },
   {
    $set:{title,link}
   }
  )
   res.json({
    message:"Content Updated"
   })
  } catch(error) {
    console.log(error)
    res.status(500).json({
      error:"Something went wrong"
    })
  }
});

app.listen(3001, ()=>{
    console.log("Server Chal Gya");
});