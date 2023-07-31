import { Component, Inject } from '@angular/core';
import { Todo } from '../services/shared/todo.model';
import { DbService } from '../services/db/db.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo:Todo },
    private dbService: DbService,
    private communicationService: CommonService
    ) 
    { 

    }

  onConfirmDeleteButton(){
    this.dbService.deleteTask(this.data.todo._id).subscribe(
      () => {
        this.closeDialog();
        this.reloadComponent();
      });
  }

  closeDialog(){
    this.dialogRef.close()
  }

  reloadComponent(){
    this.communicationService.reloadComponent('todo-item');
  }

}
