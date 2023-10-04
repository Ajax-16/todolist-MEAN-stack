import {Schema, model } from "mongoose";
import { User } from "../interfaces/user";

const userSchema = new Schema<User>(
    {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps:true,
    versionKey:false,  
}
);

const UserModel = model('users', userSchema);

export default UserModel;