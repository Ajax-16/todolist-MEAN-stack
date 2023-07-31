import { Router } from "express";
import { completeTask, deleteTask, getTask, getTasks, postTask, updateTask } from "../contollers/task.controller";

const router = Router()

router.get('/:id', getTask);
router.get('/', getTasks);
router.post('/', postTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.put('/complete/:id', completeTask);

export { router }