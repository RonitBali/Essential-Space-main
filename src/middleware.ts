import { NextFunction,Response ,Request} from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
const jwtSecret = process.env.JWT_PASSWORD;
export const userMiddleware= (req:Request , res:Response,next:NextFunction): void=>{
      const token = req.headers['authorization'];
    //   const token = req.headers.authorization;
    //@ts-ignore
    const decoded = jwt.verify(token as string,jwtSecret);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.userId; // decoded id = yash
        next();
    }
    else
       res.status(403).json({
    message:"you are not logged in"});
    

}