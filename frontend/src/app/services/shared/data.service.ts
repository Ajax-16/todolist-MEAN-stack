import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [];

  constructor(private dbService: DbService) {}

  getAllTodos(){
    return this.todos;
  }

  addTodo(todo:Todo){
    this.todos.push(todo);
  }

  updateTodo(index: number, updatedTodo: Todo){
    this.todos[index] = updatedTodo;
  }

  deleteTodo(index: number){
    this.todos.splice(index, 1);
  }

}
