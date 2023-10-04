import { Component, Input } from '@angular/core';
import { DbService } from '../services/db/db.service';
import { UserDetails } from '../services/shared/user.details';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent {

  profilePic?: string;

  user?: UserDetails;

  constructor(private dbService:DbService) {
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

    this.profilePic = newUrl;

  }

}
