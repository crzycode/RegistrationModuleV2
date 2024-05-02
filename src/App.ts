import express from 'express'
import dotenv from 'dotenv'
import { MongoConnect } from './Config/MongoConnect'
import Router from './RootRoute'
dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT
app.use('/api',Router)
MongoConnect().then(res =>{
    app.listen(PORT,() =>{
        console.log("Port Is Working fine")
    })
}).catch(res => console.log(res))

