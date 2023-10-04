import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private dbService:DbService) { }

  intercept(req:any, next:any){
    const tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.dbService.getToken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }

}