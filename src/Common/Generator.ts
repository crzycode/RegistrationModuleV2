import Jwt from 'jsonwebtoken'
export class Generate{
    public static Id = (length:number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    public static Token = (user:any, Key:any,expireIn:any) =>{
      const token = Jwt.sign(user, Key, {expiresIn: expireIn});
      return token
    }
}