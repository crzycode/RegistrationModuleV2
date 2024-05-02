import { Hash } from "../../../Common/Hash"
import { Message } from "../../../Messages/Message"
import { ChangepasswordModel } from "../../../Models/Changepassword"
import SignupCollection from "../../../Models/User"
import Jwt from 'jsonwebtoken'

export function Userpasswordreset(value:ChangepasswordModel,Id:any, Token:any){
    
   
    try{
        return SignupCollection.findById(Id).then((res:any) =>{
            const new_secret = res._doc._id+process.env.SECRET_KEY
            Jwt.verify(Token,new_secret)
            if(value.Password == value.Confirmpassword){
                return Hash(value.Password).then(res =>{
                    return SignupCollection.findByIdAndUpdate(Id,{$set:{Password:res}}).then(res =>{
                        return Message.Success("Password Updated Successfully")
                    })
                })
        }else{
            return Message.Error("Password Does not  Match")
        }
        }).catch(err =>{
            return Message.Error("Email Not found")
        })  
      
     

    }catch(err){
        return Message.Error("Invalid Token")
    }
}