import { getUserDetails, updateLevel, updateUserDetails } from "../services/user.details.service";
import { Response } from "express";
import { RequestPayload } from "../interfaces/payload";

const getUserDetailsFromUserId = async (req: RequestPayload, res:Response)=> {
    const userId = await req.user
    const response = await getUserDetails(`${userId}`);
    res.send(response);
}

const updateUserDetailsFromUserId = async (req: RequestPayload, res:Response)=>{

    const PORT = process.env.PORT;
    const HOST = process.env.HOST || 'http://localhost';

    if(req.file){
        const { filename } = req.file;
        req.body.profilePictureURL = `${HOST}:${PORT}/public/${filename}`;
    }

    const userId = await req.user;
    const response = await updateUserDetails(`${userId}`, req.body);
    res.send(response);
}

const checkLevel = async (req:RequestPayload, res: Response)=>{

    const userId = await req.user;
    const {completedTasks} = await req.body;
    const response = await updateLevel(`${userId}`, completedTasks );
    res.send(response);

};

export { getUserDetailsFromUserId, updateUserDetailsFromUserId, checkLevel }