import { Craft } from "../interfaces/craft"
import CraftModel from "../models/craft"

const insertCraft = async (craft:Craft) =>{
    const newCraft = await CraftModel.create(craft);
    return newCraft;
}

const deleteCraft = async (taskId:string) =>{
    const deleteCraft = await CraftModel.deleteOne({taskId:taskId});
    return deleteCraft;
}

const getCrafts = async () =>{
    const craft = await CraftModel.find({});
    return craft;
}

export { insertCraft, deleteCraft, getCrafts};