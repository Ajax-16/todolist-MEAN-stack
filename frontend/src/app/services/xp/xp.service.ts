import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  constructor() { }

  tasksForNextLevel(level: number) {
    const baseTasksForLevelUp = 3;
    const tasksMultiplier = 1.5;
    if (level >= 2) {
      return Math.round(baseTasksForLevelUp * tasksMultiplier);
    } else {
      return baseTasksForLevelUp;
    }

  }

    tasksForPreviousLevel(level: number){
      const baseTasksForLevelUp = 3;
      const tasksMultiplier = 1.5;
      if (level >= 2) {
        return Math.round(baseTasksForLevelUp * (tasksMultiplier ** (level - 2)));
      } else {
        return baseTasksForLevelUp;
      }
    }



}
