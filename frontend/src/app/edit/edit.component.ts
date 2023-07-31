import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Todo } from '../services/shared/todo.model';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { SimpleTodo } from '../services/shared/simple.todo.model';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  tempTodo?: Todo;

  constructor (
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo:Todo },
    private dbService: DbService,
    private communicationService: CommonService
  ) {
    this.tempTodo = { ...data.todo };
  }

  onFormSubmit(form:NgForm){
    if(form.valid){
      this.dbService.updateTask(new SimpleTodo(form.value.taskName, form.value.taskDesc, form.value.taskState, form.value.taskDay, form.value.taskStartTime, form.value.taskEndTime), 
      this.data.todo._id).subscribe(response=>{
        this.closeDialog();
        this.reloadComponent();
      });
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

  reloadComponent(){
    this.communicationService.reloadComponent('todo-item');
  }

}
