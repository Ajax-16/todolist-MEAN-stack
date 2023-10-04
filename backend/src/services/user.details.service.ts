import { UserDetails } from "../interfaces/user.details";
import userDetailsModel from "../models/user-details";
import { userLevel } from "../utils/level-handle";

const createUserDetails = async (userDetails: UserDetails)=>{
    const response = await userDetailsModel.create(userDetails);
    return response;
}

const getUserDetails = async (user_id: string)=>{
    const response = await userDetailsModel.findOne({user_id:user_id});
    return response;
}

const updateUserDetails = async (user_id: string, userDetails: UserDetails)=>{
    const response = await userDetailsModel.findOneAndUpdate({user_id:user_id}, userDetails);
    return response;
}

const incrementTaskNum = async (user_id: string)=>{
    const response = await userDetailsModel.findOneAndUpdate({user_id:user_id}, {$inc:{totalTasks:1}});
    return response;
}

const decrementTaskNum = async (user_id: string)=>{
    const response = await userDetailsModel.findOneAndUpdate({user_id:user_id}, {$inc:{totalTasks:-1}});
    return response;
}

const addCompletedTask = async (user_id: string)=>{
    const response = await userDetailsModel.findOneAndUpdate({user_id:user_id}, {$inc:{completedTasks:1}});
}

const updateLevel = async (user_id: string, totalTasks: number)=>{
    const newLevel = userLevel(totalTasks);
    const response = await userDetailsModel.findOneAndUpdate({user_id:user_id}, {$set:{level:newLevel}},{new:true});
    return response;
}

export { createUserDetails, getUserDetails, updateUserDetails, incrementTaskNum, decrementTaskNum, addCompletedTask, updateLevel } 