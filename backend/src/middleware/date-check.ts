import { NextFunction, Response } from "express";
import { RequestPayload } from "../interfaces/payload";
import { getAllTasks, updateTaskById } from "../services/task.service";
import TaskModel from "../models/task";

const checkEndDate = async (req: RequestPayload, res: Response, next: NextFunction) => {
    const tasks = await getAllTasks();
    const today = new Date();
  
    for (let i = 0; i < tasks.length; i++) {
      const taskDay = tasks[i].day;
      const taskEndTime = tasks[i].end_time;

      const dateParts = taskDay.split('-');
      const timeParts = taskEndTime.split(':');

      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);

      const taskEndDay = new Date(year, month, day, hours, minutes);

      if (tasks[i].state !== 'complete' && taskEndDay <= today) {
        await TaskModel.updateOne({ _id: tasks[i]._id }, { state: 'incomplete' });
      }
    }
  
    next();
  };

export { checkEndDate };