import { Component } from '@angular/core';
import { Todo } from '../services/shared/todo.model';
import { DbService } from '../services/db/db.service';
import { MatDialog } from '@angular/material/dialog'
import { EditComponent } from '../edit/edit.component';
import { CommonService } from '../services/common/common.service';
import { DeleteComponent } from '../delete/delete.component';
import { UserDetails } from '../services/shared/user.details';
import { LevelUpComponent } from '../level-up/level-up.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todos?: Todo[]; 
  crafts?: any[];
  noData: boolean = false;
  isLoading: boolean = false;
  dataFiltered: boolean = false;

  constructor(private dbService: DbService, private dialog: MatDialog, private communicationService: CommonService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadTasks();
    this.communicationService.reloadComponet$.subscribe((componentName: string)=>{
      if(componentName=='todo-item'){
        this.loadTasks();
      }
    });
  }

  loadTasks() {
    this.dbService.getAllTasks().subscribe((res) => {
      this.todos = res.data;
      this.dbService.getCrafts().subscribe((crafts) => {
        this.crafts = crafts;
        this.isLoading = false;
  
        if (this.todos) {

          this.todos = this.todos.filter((task) => {
            const createdCraft = this.crafts?.find((craft) => craft.taskId === task._id);
            this.dataFiltered = true;
            return createdCraft && res.userId === createdCraft.userId;
          });
        }
  
        this.updateNoDataState();
      });
    });
  }

  completeTodo(task: Todo) {
    if (task.state === 'complete') {
      return;
    }
  
    this.dbService.completeTask(task._id).subscribe(
      async (completedTask: any) => {
        const index = this.todos?.findIndex(todo => todo._id === completedTask._id);
        if (this.todos && index !== undefined && index !== -1) {
          this.todos[index] = completedTask;
        }
        this.updateNoDataState();
  
        await this.dbService.getUserDetails().subscribe(async resultn1 => {
          const previousLevel = resultn1.level;
          console.log(previousLevel)
          await this.checkLevel(resultn1);
          await this.dbService.getUserDetails().subscribe(resultn2=>{
            const currentLevel = resultn2.level;
            console.log(currentLevel)
            if (currentLevel > previousLevel) {
              const dialogRef = this.dialog.open(LevelUpComponent,
                {data: {
                  user: resultn2
                }
              });
              dialogRef.afterClosed().subscribe(result=>{
  
              });
            }
          });
        });
      }
    );
  }

  async checkLevel(user:UserDetails){
    this.dbService.checkLevel(user).subscribe(result=>{
      console.log('updated level')
    });
  }

  deleteTodo(task: Todo) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        todo: task
      } 
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading = true;
      this.dataFiltered = false;
    })
  }

  editTodo(task:Todo){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        todo: task
      } 
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading = true;
      this.dataFiltered = false;
    })

  }

  updateNoDataState() {
    this.noData = !this.todos || this.todos.length === 0;
  }

  getEstado(task:Todo){
    switch(task.state){
      case "complete":
      return "Completada"

      case "in progress":
      return "En proceso"

      case "incomplete":
      return "Incompleta"

      case "not started":
      return "No empezada"
      
    }
  }

}