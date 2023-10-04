import { Request, Response } from "express"
import { insertTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById, setTaskToComplete } from "../services/task.service";
import { JwtPayload } from "jsonwebtoken";
import { deleteCraft, insertCraft } from "../services/craft.service";
import { addCompletedTask, decrementTaskNum, incrementTaskNum } from "../services/user.details.service";

interface RequestPayload extends Request{
    user?: string | JwtPayload;
}

const getTask = async (req:RequestPayload, res:Response) => {
    try{
        const { id } = req.params;
        const responseTask = await getTaskById(id);
        const data = responseTask ? responseTask : "TASK NOT FOUND"
        const userId = await req.user;
        res.send({
            data: data,
            user: userId
        });
    }catch(e){
        res.status(500);
        res.send("Error GET task")
    }
};

const getTasks = async (req:RequestPayload, res:Response) => {
    try{
        const responseTask = await getAllTasks();
        const data = responseTask ? responseTask : "TASK NOT FOUND"
        const userId = await req.user;
        res.send({
            data: data,
            userId: userId
        });
    }catch(e){
        res.status(500);
        res.send("Error GET tasks");
    }
};

const postTask = async (req:RequestPayload, res:Response) => {
    try{
        const { body } = req;
        const responseTask = await insertTask(body);
        const userId = await req.user
        const newCraft = await insertCraft({
            userId: `${userId}`,
            taskId: `${responseTask._id}`
        })
        await incrementTaskNum(`${userId}`);
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error POST task");
    }
};

const deleteTask = async (req:RequestPayload, res:Response) => {
    try{
        const {id} = req.params;
        const userId = await req.user;
        const responseTask = await deleteTaskById(id);
        await deleteCraft(id);
        await decrementTaskNum(`${userId}`);
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error DELETE task");
    }
};

const updateTask = async ({ params, body }:RequestPayload, res:Response) => {
    try{
        const { id } = params;
        const responseTask = await updateTaskById( id, body );
        res.send(responseTask);
    }catch(e){
        res.status(500);
        res.send("Error PUT task");
    }
};

const completeTask = async (req:RequestPayload, res:Response) => {
    const { id } = req.params;
    const responseTask = await setTaskToComplete(id);
    const userId = await req.user;
    await addCompletedTask(`${userId}`);
    res.send(responseTask);
};

export { getTask, getTasks, postTask, deleteTask, updateTask, completeTask };