const userLevel = (totalTasksDone:any):any =>{

    const baseTasksForLevelUp = 3; 
    const tasksMultiplier = 1.5; 

    let level = 1; 
    let tasksForNextLevel = baseTasksForLevelUp; 
    while (totalTasksDone >= tasksForNextLevel) {
        totalTasksDone -= tasksForNextLevel;
        level++;
        tasksForNextLevel = Math.round(tasksForNextLevel * tasksMultiplier);
        console.log(tasksForNextLevel);
    }

  return level > 30 ? 30 : level; 

}

export { userLevel };