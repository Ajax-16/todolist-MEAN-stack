import { Component, ViewChild } from '@angular/core';
import { DbService } from '../services/db/db.service';
import { UserDetails } from '../services/shared/user.details';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { XpService } from '../services/xp/xp.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user?: UserDetails;

  profilePic?: string;

  showValidationErrors: boolean = false;

  xpToNextLevel: number = 0;

  actualXp: number = 0;

  constructor(private dbService: DbService, private router:Router, private xpService:XpService) {}

  @ViewChild('fileInput') fileInput: any; // Accedemos al input mediante la referencia local

  selectedFileName: string = "Archivo en formato .png"; // Variable para almacenar el nombre del archivo seleccionado

  onFileSelected(event: any) {
    const fileName = event.target.files[0]?.name;
    this.selectedFileName = fileName || ""; // Asignamos el nombre del archivo seleccionado a la variable
  }

  ngOnInit() {
    this.dbService.getUserDetails().subscribe(async (result) => {
      this.user = result;
      this.xpToNextLevel = this.xpService.tasksForNextLevel(this.user.level);
      if (!this.user.profilePictureURL) {
        this.profilePic = 'http://localhost:3002/public/default_user_icon.png'
      } else {
        this.uploadGraphics(this.user.profilePictureURL);
      }
    });
  }

  uploadGraphics(newUrl:string){

    this.profilePic = newUrl;

  }

  async uploadImage(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true;

    const formData = new FormData();
    formData.append('image', this.fileInput.nativeElement.files[0]);

    await this.dbService.editUserDetails(formData).subscribe(result=>{
        // Realiza acciones adicionales después de la carga exitosa si es necesario
        window.location.reload();
      },
      err => {
        console.error('Error al subir el archivo:', err);
        // Realiza acciones adicionales en caso de error si es necesario
      }
    );

    this.showValidationErrors = false;
    form.reset();
    return;
  }

}
