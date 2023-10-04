import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../services/shared/user';
import { DbService } from '../services/db/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMessage?: string;

  wrongPass: boolean = false;
  showValidationErrors: boolean = false;

  password?: string;
  showPassword: boolean = false;
  passwordType: string = 'password';

  confirmPassword?: string;
  showConfirmPassword: boolean = false;
  confirmPasswordType: string = 'password';

  constructor(private dbService: DbService, private router:Router){}

  async onFormSubmit(form:NgForm){

    if(form.invalid){
      this.errorMessage = 'Uno de los campos está vacío o es inválido';
      return this.showValidationErrors = true;
    }

    if(!this.verifyPassword(form.value.password, form.value.repeatedPassword)){
      this.wrongPass = true;
      this.errorMessage = 'Contraseñas no coincidentes';
      return this.showValidationErrors = true;
    }

    await this.dbService.registerUser(new User(form.value.username, form.value.email, form.value.password)).subscribe(response=>{
      this.router.navigate(['/signin']);
    }, err=>{
      if(err.error==='USERNAME ALREADY IN USE'){
        this.errorMessage = 'El nombre de usuari@ ya está en uso';
        return this.showValidationErrors = true;
      }else if(err.error.text==='USER ALREADY REGISTERED'){
        this.errorMessage = 'El usuari@ ya está registrado';
        return this.showValidationErrors = true;
      }
      this.errorMessage = 'Error';
      return this.showValidationErrors = true;
    });

    this.wrongPass = false;
    this.showValidationErrors = false;

    return 0;

  }

  verifyPassword(pass1:string, pass2:string){
    return pass1 == pass2;
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(){
    this.showConfirmPassword = !this.showConfirmPassword;
    this.confirmPasswordType = this.showConfirmPassword ? 'text' : 'password';
  }

}
