import { Generate } from "../../../Common/Generator";
import { Validator } from "../../../Common/Validator";
import transporter from "../../../Config/Email";
import { Message } from "../../../Messages/Message";
import { EmailModel } from "../../../Models/EmailModel";
import SignupCollection from "../../../Models/User";

export function Senduserpasswordreset(data:EmailModel){
    const Email = data.Email
    if(Validator.Email(Email)){
        var val = SignupCollection.findOne({Email:Email}).then((res:any) =>{
            const Secret = res._id+process.env.SECRET_KEY
            var Token = Generate.Token({Id:res._id},Secret,'10m')
            const Link = `http://127.0.0.1:3000/api/user/reset/${res._id}/${Token}`
            console.log()
           return transporter.sendMail({
                from:process.env.EMAIL_FROM,
                to:res.Email,
                subject:"Reset Password",
                html:`<a href=${Link}>Click Here</a>`
            }).then((res:any) =>{
                console.log(res)
                return Message.Success("Please Check Your Email")
            }).catch((err:any) =>{
                console.log(err)
                return Message.Error("Email unregistered",err)
            })
          
        }).catch(err =>{
            return Message.Error("Email Does not Exist",err,301,"Failed")
        })
        return val
    }else{
        return Message.Error("Invalid Email",null,301,"Failed")
    }
}