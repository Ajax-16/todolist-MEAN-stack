import { Request, Response } from "express";
import { getCrafts } from "../services/craft.service";

const getAllCrafts = async (req:Request, res: Response)=>{
    try{
        const response = await getCrafts();
        res.send(response);
    }catch(err){
        res.status(500).send(err);
    }
}

export {getAllCrafts}