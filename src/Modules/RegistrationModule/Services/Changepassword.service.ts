import { Hash } from "../../../Common/Hash";
import { Message } from "../../../Messages/Message";
import { ChangepasswordModel } from "../../../Models/Changepassword";
import SignupCollection from "../../../Models/User";

export function ChangepasswordService(value:ChangepasswordModel,user:any){
    if(value){
        if(value.Password == value.Confirmpassword){
            return Hash(value.Password).then(res =>{
               return SignupCollection.findByIdAndUpdate(user._id,{$set:{Password:res}}).then(res =>{
                 return Message.Success("Password Update Successfully",null,200,"Success")
                }).catch(err =>{
                    return Message.Error("Failed to Update Password",err,301,"Failed")
                })
            }).catch(err =>{
                return Message.Error("Failed to Update Password",err,301,"Failed")
            })
        }else{
            return Message.Error("Password does not Match",null,301,"Failed")
        }
    }
}