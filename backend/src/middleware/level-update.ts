import { NextFunction, Response } from "express";
import { RequestPayload } from "../interfaces/payload";
import { updateLevel } from "../services/user.details.service";

const checkLevel = async (req:RequestPayload, res: Response)=>{

    const userId = req.user;
    console.log(req.body)
    const {completedTasks} = req.body;
    const response = await updateLevel(`${userId}`,completedTasks );
    res.send(response);

};

export { checkLevel };