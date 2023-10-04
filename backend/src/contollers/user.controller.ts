import { Request, Response } from "express";
import { getUserName, insertUser, loginUser } from "../services/user.service";

const userRegister = async ({body}: Request, res: Response)=>{
    try{    
        const responseUser = await insertUser(body);
        res.send(responseUser);
    }catch(err){
        res.status(500).send('USERNAME ALREADY IN USE');
    }
}

const userLogin = async ({body}: Request, res: Response)=>{
    try{
        const responseUserWithJWT = await loginUser(body);
        res.send(responseUserWithJWT);
    }catch(err){
        res.status(500).send('INVALID USER LOGIN');
    }
}

const username = async ({params}: Request, res:Response)=>{
    try{
        const { email } = params;
        const responseUsername = await getUserName(email);
        res.send(responseUsername);
    }catch(err){
        res.status(500).send('NOT SUCH EMAIL');
    }
}

export { userRegister, userLogin, username };