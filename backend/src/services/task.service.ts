import { Task } from "../interfaces/task"
import TaskModel from "../models/task"

const insertTask = async (task: Task) => {
    const response = await TaskModel.create(task);
    return response;
};

const getAllTasks = async () => {
    const response = await TaskModel.find({});
    return response;
};  

const getTaskById = async (id:string) => {
    const response = await TaskModel.findOne({ _id : id });
    return response;
};

const deleteTaskById = async (id:string) => {
    const reponse = TaskModel.deleteOne({ _id: id })
    return reponse;
};

const updateTaskById = async (id:string, data: Task) => {
    const response = await TaskModel.findOneAndUpdate(
        {
            _id:id
        },
        data,
        {
            new: true
        }
    );  
};

const setTaskToComplete = async (id:string) => {
    let response = await TaskModel.findOne({_id : id});
    if(response){
        response.state = 'complete';
        await response.save();
        return response;
    }else{
        return "error";
    }
}

export { insertTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById, setTaskToComplete }