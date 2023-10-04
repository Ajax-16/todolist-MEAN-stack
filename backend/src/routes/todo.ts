import { Router } from "express";
import { completeTask, deleteTask, getTask, getTasks, postTask, updateTask } from "../contollers/task.controller";
import { checkJWT } from "../middleware/session";
import { checkEndDate } from "../middleware/date-check";

const router = Router()

router.get('/:id', checkJWT, getTask);
router.get('/', checkJWT, checkEndDate, getTasks);
router.post('/', checkJWT, postTask);
router.delete('/:id',checkJWT, deleteTask);
router.put('/:id',checkJWT, updateTask);
router.put('/complete/:id',checkJWT, completeTask);

export { router }