import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { SimpleTodo } from '../services/shared/simple.todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit{

  todos?: any
  showValidationErrors?: boolean;

  constructor(private dbService:DbService) { }

  ngOnInit(): void{
  }

  onFormSubmit(form: NgForm){

    if (form.invalid) return this.showValidationErrors = true;

    this.dbService.addTask(new SimpleTodo(form.value.taskName, form.value.taskDesc, form.value.taskState, form.value.taskDay, form.value.taskStartTime, form.value.taskEndTime)).subscribe(
      (response)=>{
      }
    );
    this.showValidationErrors = false;

    form.reset();

    return 0;

}

}
