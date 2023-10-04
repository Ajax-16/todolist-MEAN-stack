import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetails } from '../services/shared/user.details';
import { DbService } from '../services/db/db.service';

@Component({
  selector: 'app-level-up',
  templateUrl: './level-up.component.html',
  styleUrls: ['./level-up.component.scss']
})
export class LevelUpComponent {

  user?:UserDetails

  profilePic?:string

  constructor(
    public dialogRef:MatDialogRef<LevelUpComponent>,
    @Inject (MAT_DIALOG_DATA) public data: {user:UserDetails},
    private dbService:DbService) {
      console.log(data.user)
      this.user = {...data.user};
     }

     ngOnInit() {
      this.dbService.getUserDetails().subscribe(async (result) => {
        this.user = result;
        if (!this.user.profilePictureURL) {
          this.profilePic = 'http://localhost:3002/public/default_user_icon.png'
        } else {
          this.uploadGraphics(this.user.profilePictureURL);
        }
      });
    }
  
    uploadGraphics(newUrl:string){
  
      console.log(newUrl)
  
      this.profilePic = newUrl;
  
    }

}
