import mongoose,{connect}  from "mongoose";
export const  MongoConnect = async() =>{
    return await connect("mongodb://localhost:27017/test").then((res) => console.log("Connected")).catch((err) =>{console.log(err)})
}