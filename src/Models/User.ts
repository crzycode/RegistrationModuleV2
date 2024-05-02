import mongoose,{Schema,model,Document} from "mongoose"
export interface Signupmodel{
    _id?:string
    Name:string
    Email:string
    Number:string
    Role?:number
    Password:string

}
export interface Signupmodeldocument extends Document {
    _id?:string
    Name:string
    Email:string
    Number:string
    Role?:number,
    Password:string
}
const SignupModelSchema = new Schema<Signupmodel>({
    _id:{type:String,required:true},
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Number:{type:String,required:true},
    Role:{type:Number,default:0},
    Password:{type:String,required:true},
},{versionKey:false})

const SignupCollection = model<Signupmodel>("users",SignupModelSchema)
export default SignupCollection