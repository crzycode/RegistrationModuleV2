import {Request,Response,NextFunction} from 'express'
import Jwt,{ JwtPayload } from 'jsonwebtoken';
import { Message } from '../Messages/Message';
import SignupCollection from '../Models/User';






export function Auth(req:any,res:Response,next:NextFunction){
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.json(Message.Error("Authentication Failed Token not found",null,401,"Authentication"))
          }else{
            var key:any = process.env.SECRET_KEY
            const decoded:any = Jwt.verify(token,key);
           var userdata = SignupCollection.findById({_id:decoded.Id}).then((user:any) =>{
            const {_id,Name,Email,Number,Role} = user._doc
            if(user){
                req.user = {_id,Name,Email,Number,Role}
                next();
            }else{
                res.json(Message.Error("Authentication Failed User not found",null,401,"Authentication"))
            }
           }).catch(err =>  res.json(Message.Error("Authentication Failed User not found",null,401,"Authentication")))         
          }
    }catch(err){
        res.json(Message.Error("Authentication Failed",null,401,"Authentication"))
    }

}