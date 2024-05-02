import express from 'express'
import RegistrationRouter from './Routes/RegistrationRoute'
const Router = express.Router()

Router.use('/Registration',RegistrationRouter)
export default Router