import { Component } from '@angular/core';
import { Todo } from '../services/shared/todo.model';
import { DbService } from '../services/db/db.service';
import { MatDialog } from '@angular/material/dialog'
import { EditComponent } from '../edit/edit.component';
import { CommonService } from '../services/common/common.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  todos?: Todo[]; 
  noData: boolean = false;
  isLoading: boolean = false;


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
    this.dbService.getAllTasks().subscribe(
      (data: Todo[]) => {
        this.isLoading = false;
        this.todos = data;
        this.updateNoDataState();
      }
    );
  }

  completeTodo(task: Todo) {
    this.dbService.completeTask(task._id).subscribe(
      (completedTask: any) => {
        const index = this.todos?.findIndex(todo => todo._id === completedTask._id);
        if (this.todos && index !== undefined && index !== -1) {
          this.todos[index] = completedTask;
        }
        this.updateNoDataState();
      });
  }

  deleteTodo(task: Todo) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        todo: task
      } 
    });

    dialogRef.afterClosed().subscribe(result=>{

    })
  }

  editTodo(task:Todo){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        todo: task
      } 
    });

    dialogRef.afterClosed().subscribe(result=>{

    })

  }

  updateNoDataState() {
    this.noData = !this.todos || this.todos.length === 0;
  }

}