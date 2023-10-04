import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { SimpleTodo } from '../shared/simple.todo.model';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { Craft } from '../shared/craft';
import { UserDetails } from '../shared/user.details';

interface userResponse {
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http:HttpClient, private router:Router) { }

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

  registerUser(user:User){
    return this.http.post('http://localhost:3002/user/register', user);
  }

  getUsername(email:string){
    return this.http.get(`http://localhost:3002/user/${email}`, {responseType: 'text'});
  }

  loginUser(user:User): Observable<userResponse>{
    return this.http.post<userResponse>('http://localhost:3002/user/login', user);
  }

  loggedIn(): Boolean{
     return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }

  getCrafts(): Observable<Craft[]>{
    return this.http.get<Craft[]>('http://localhost:3002/craft/');
  }

  getUserDetails(): Observable<UserDetails>{
    return this.http.get<UserDetails>('http://localhost:3002/user-details');
  }

  editUserDetails(imageObject: any){
    return this.http.put('http://localhost:3002/user-details', imageObject);
  }

  checkLevel(userDetails:any){
    return this.http.put('http://localhost:3002/user-details/level-check', userDetails);
  }

  

}
