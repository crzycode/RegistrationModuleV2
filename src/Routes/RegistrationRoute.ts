import express from 'express'
import { RegistrationController } from '../Modules/RegistrationModule/Controllers/RegistrationController';
import { Auth } from '../Common/Verify';

const RegistrationRouter = express.Router();
RegistrationRouter.post('/signup',RegistrationController.Register)
RegistrationRouter.post('/login',RegistrationController.Login)
RegistrationRouter.post('/changepassword',Auth,RegistrationController.Changepassword)
RegistrationRouter.get('/loggeduser',Auth,RegistrationController.Loggeduser)
RegistrationRouter.post('/sendemailreset',RegistrationController.SendUserPasswordResetEmail)
RegistrationRouter.post('/reset/:id/:token',RegistrationController.UserResetPassword)
export default RegistrationRouter