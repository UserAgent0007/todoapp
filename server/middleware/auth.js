import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


export const authRequired = (req, res, next)=>{
    const authHeaders = req.cookies.jwt_token;

    if (!authHeaders?.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided"}) 
    }

    const token = authHeaders.split(" ")[1];

    try{
        const decoded_user = jwt.verify(token, process.env.JWT_SECRET); // рохшифровує токен за заданим Secret_key
        req.user = decoded_user;
        next()
    }
    catch(err){
        res.status(401).json({message:"Invalid or expired token"});
    }
}

export const userPresent = async (req, res, next)=>{
    const {email} = req.body;

    const userExist = await User.findOne({email:email});

    try{
        if (userExist){
            return res.status(409).json({message:"User already exists"});
        }
        
        next();
    }

    catch (err){

        return res.status(500).json({message:err.message})
    }

}

