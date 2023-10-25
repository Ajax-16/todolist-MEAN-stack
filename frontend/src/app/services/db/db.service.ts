import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
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
    return this.http.get('https://k1wcpdjw-3002.uks1.devtunnels.ms/todo/');
  }

  addTask(Task:SimpleTodo): Observable<any>{
    return this.http.post('https://k1wcpdjw-3002.uks1.devtunnels.ms/todo/', Task);
  }

  completeTask(id:string){
    return this.http.put(`https://k1wcpdjw-3002.uks1.devtunnels.ms/todo/complete/${id}`, '');
  }

  deleteTask(id:string){
    return this.http.delete(`https://k1wcpdjw-3002.uks1.devtunnels.ms/todo/${id}`);
  }

  updateTask(newTask: SimpleTodo, id:string){
    return this.http.put(`https://k1wcpdjw-3002.uks1.devtunnels.ms/todo/${id}`, newTask);
  }

  registerUser(user:User){
    return this.http.post('https://k1wcpdjw-3002.uks1.devtunnels.ms/user/register', user);
  }

  getUsername(email:string){
    return this.http.get(`https://k1wcpdjw-3002.uks1.devtunnels.ms/user/${email}`, {responseType: 'text'});
  }

  loginUser(user:User): Observable<userResponse>{
    return this.http.post<userResponse>('https://k1wcpdjw-3002.uks1.devtunnels.ms/user/login', user);
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
    return this.http.get<Craft[]>('https://k1wcpdjw-3002.uks1.devtunnels.ms/craft/');
  }

  getUserDetails(): Observable<UserDetails>{
    return this.http.get<UserDetails>('https://k1wcpdjw-3002.uks1.devtunnels.ms/user-details');
  }

  editUserDetails(imageObject: any){
    return this.http.put('https://k1wcpdjw-3002.uks1.devtunnels.ms/user-details', imageObject);
  }

  checkLevel(userDetails:any){
    return this.http.put('https://k1wcpdjw-3002.uks1.devtunnels.ms/user-details/level-check', userDetails);
  }

}
