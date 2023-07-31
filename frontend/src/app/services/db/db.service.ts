import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { SimpleTodo } from '../shared/simple.todo.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http:HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get('http://localhost:3002/todo/');
  }

  addTask(Task:SimpleTodo): Observable<any>{
    return this.http.post('http://localhost:3002/todo/', Task);
  }

  completeTask(id:string){
    return this.http.put(`http://localhost:3002/todo/complete/${id}`, '');
  }

  deleteTask(id:string){
    return this.http.delete(`http://localhost:3002/todo/${id}`);
  }

  updateTask(newTask: SimpleTodo, id:string){
    return this.http.put(`http://localhost:3002/todo/${id}`, newTask);
  }

}
