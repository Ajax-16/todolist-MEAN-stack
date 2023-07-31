import {Schema, Types, model, Model} from "mongoose";
import { Task } from "../interfaces/task";

const TaskSchema = new Schema<Task>(
    {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        state:{
            type: String,
            enum: ['incomplete','complete','in progress','not started'],
            required: true
        },
        day:{
            type: String,
            required: true
        },
        start_time:{
            type: String,
            required: true
        },
        end_time:{
            type: String,
            required: true
        }
    },
    {
        timestamps:true,
        versionKey:false,  
    }
);

const TaskModel = model('tasks', TaskSchema)

export default TaskModel