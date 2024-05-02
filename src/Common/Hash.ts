import bcrypt from 'bcrypt'
 export async function Hash(Password:any){
    const salt = await bcrypt.genSalt(10)
    return (await bcrypt.hash(Password,salt)).toString()
}