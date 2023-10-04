import { User } from "../interfaces/user";
import UserModel from "../models/user";
import { generateToken } from "../utils/jwt.handle";
import { encrypt, verified } from "../utils/password.handle";
import { createUserDetails } from "./user.details.service";

const insertUser = async ({username, email, password}: User)=>{
    const userExist = await UserModel.findOne({email: email});
    if (userExist) return "USER ALREADY REGISTERED";
    const passHash = await encrypt(password);
    const newUserRegister = await UserModel.create({
        username: username,
        email: email,
        password: passHash
    });
    const newUserDetails = await createUserDetails({
        username: `${newUserRegister.username}`,
        user_id: `${newUserRegister._id}`,
        profilePictureURL: '',
        totalTasks: 0,
        completedTasks:0,
        level: 1
    })

    return newUserRegister;
    
};

const loginUser = async ({password, email}: User)=>{
    const userExist = await UserModel.findOne({email: email});
    if(!userExist) return "USER NOT FOUND";

    const hashedPass = userExist.password;

    const checkPass = await verified(password, hashedPass);

    if(!checkPass) return "INCORRECT PASSWORD";

    const token = await generateToken(`${userExist._id}`);

    return {token};

}

const getUserName = async (email:string) =>{
    const userExist = await UserModel.findOne({email: email});
    if(!userExist) return "USER NOT FOUND";

    return userExist.username;
}

export { insertUser, loginUser, getUserName };
