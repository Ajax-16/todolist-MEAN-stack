import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { User } from '../services/shared/user';
import { Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';
import { CookieService } from 'ngx-cookie-service';

interface userResponse {
  token:string
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {

  errorMessage?: string

  showValidationErrors:boolean = false;

  password?: string;
  showPassword: boolean = false;
  passwordType: string = 'password';

  constructor(private dbService:DbService,
              private router:Router,
              private commonService:CommonService){}

  async onFormSubmit(form:NgForm){

    if(form.invalid){
      this.errorMessage = 'Uno de los campos está vacío o es inválido';
      return this.showValidationErrors = true;
    }

    const username =  this.dbService.getUsername(form.value.email).subscribe(response=>{
    });

    await this.dbService.loginUser(new User(username.toString(), form.value.email, form.value.password)).subscribe((res:userResponse)=>{
      localStorage.setItem('token', res.token);
      window.location.reload();
    }, err=>{
      this.errorMessage = 'El email y/o contraseña introducidos no son correctos'
      return this.showValidationErrors = true;
    });

    this.router.navigate(['/'])

    this.showValidationErrors = false;

    return 0;

  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

}
