import { Request, Response, request, response } from "express"
import { insertTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById, setTaskToComplete } from "../services/task.service";

const getTask = async ({params}:Request, res:Response) => {
    try{
        const { id } = params;
        const responseTask = await getTaskById(id);
        const data = responseTask ? responseTask : "TASK_NOT_FOUND"
        res.send(data);
    }catch(e){
        res.status(500);
        res.send("Error GET task")
    }
};

const getTasks = async (req:Request, res:Response) => {
    try{
        const responseTask = await getAllTasks();
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error GET tasks");
    }
};

const postTask = async ({ body }:Request, res:Response) => {
    try{
        const responseTask = await insertTask(body);
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error POST task");
    }
};

const deleteTask = async ({params}:Request, res:Response) => {
    try{
        const {id} = params;
        const responseTask = await deleteTaskById(id);
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error DELETE task");
    }
};

const updateTask = async ({ params, body }:Request, res:Response) => {
    try{
        const { id } = params;
        const responseTask = await updateTaskById( id, body );
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error PUT task");
    }
};

const completeTask = async ({params}:Request, res:Response) => {
    const { id } = params;
    const responseTask = await setTaskToComplete(id);
    res.send(responseTask);
};

export { getTask, getTasks, postTask, deleteTask, updateTask, completeTask };