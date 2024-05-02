import { Request, Response } from "express";
import SignupCollection, { Signupmodel } from "../../../Models/User";
import { SignupService } from "../Services/Signup.service";
import { Loginmodel } from "../../../Models/Login";
import { Loginservice } from "../Services/Login.service";
import {ChangepasswordModel } from "../../../Models/Changepassword";
import { ChangepasswordService } from "../Services/Changepassword.service";
import { Message } from "../../../Messages/Message";
import { EmailModel } from "../../../Models/EmailModel";
import { Senduserpasswordreset } from "../Services/Senduserpasswordreset.service";
import { Userpasswordreset } from "../Services/Userpasswordreset";

export class RegistrationController{
   static Register = async (req:Request,res:Response) =>{
        var signup:Signupmodel = req.body
        var data = await SignupService(signup)
        res.json(data)
    }
   static Login = async (req:Request,res:Response) =>{
        var signin:Loginmodel = req.body
        var data = await Loginservice(signin)
        res.json(data)
    }
    static Changepassword = async(req:any,res:Response) =>{
        var changepasswordmodel:ChangepasswordModel = req.body
        var data = await ChangepasswordService(changepasswordmodel,req.user)
        res.json(data)
    }
    static Loggeduser = async(req:any,res:Response) =>{
        res.json(Message.Success("Success",req.user,200,"Success"))
    }
    static SendUserPasswordResetEmail = async(req:any,res:Response) =>{
        var Email:EmailModel = req.body
       var data = await Senduserpasswordreset(Email)
        res.json(data)
    }
    static UserResetPassword = async (req:Request,res:Response) =>{
        const ResetPassword:ChangepasswordModel = req.body
        const {id,token} = req.params
      var data =  await Userpasswordreset(ResetPassword,id,token)
      res.json(data)



    }
}