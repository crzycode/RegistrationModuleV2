import nodemailer from 'nodemailer'

 let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    service:'gmail',
    secure:false,
    auth:{
        user:'cb.mangalsingh@gmail.com',
        pass:'ifne qnoa mvsi oojj'
    }
})
export default transporter