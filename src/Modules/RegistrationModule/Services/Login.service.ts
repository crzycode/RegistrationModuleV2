import { Generate } from "../../../Common/Generator";
import { Hash } from "../../../Common/Hash";
import { Validator } from "../../../Common/Validator";
import { Message } from "../../../Messages/Message";
import { Loginmodel } from "../../../Models/Login";
import SignupCollection from "../../../Models/User";
import bcrypt from 'bcrypt'

export function Loginservice(Login: Loginmodel): any {
    var data:any;
  if (Validator.Email(Login.Username)) {
    data = SignupCollection.findOne({Email:Login.Username}).then((res:any) =>{
        if(res != null){
            return  bcrypt.compare(Login.Password,res.Password).then(ismatch =>{
                if(ismatch){
                    var { Name, _id} = res;
                    var obj = {
                        token:Generate.Token({Id:res._id},process.env.SECRET_KEY,"60s"),
                        res:{Name,_id}
                    }
                    return Message.Success("Login Successfully",obj)
                }else{
                    return Message.Error("User Not Found", Login.Username);
                }
            }).catch(err =>{
                return Message.Error("User Not Found", Login.Username);
            })

        }else{
            return Message.Error("User Not Found", Login.Username);
        }
    }).catch(err => {  return Message.Error(err.errorResponse.errmsg,null,err.errorResponse.code)})
    return data
  } 
  else if(Validator.Number(Login.Username)) {
    data = SignupCollection.findOne({Number:Login.Username}).then((res:any) =>{
        if(res != null){
            return  bcrypt.compare(Login.Password,res.Password).then(ismatch =>{
                if(ismatch){
                    var { Name, _id} = res;
                    var obj = {
                        token:Generate.Token({Id:res._id},process.env.SECRET_KEY,"30s"),
                        res:{Name,_id}
                    }
                    return Message.Success("Login Successfully",obj)
                }else{
                    return Message.Error("User Not Found", Login.Username);
                }
            }).catch(err =>{
                return Message.Error("User Not Found", Login.Username);
            })
        }else{
            return Message.Error("User Not Found", Login.Username);
        }
    }).catch(err => {  return Message.Error(err.errorResponse.errmsg,null,err.errorResponse.code)})
    return data
  }else{
    return Message.Error("User Not Found", Login.Username);
  }
}