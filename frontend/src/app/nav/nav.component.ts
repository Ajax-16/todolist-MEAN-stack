import { Component } from '@angular/core';
import { DbService } from '../services/db/db.service';
import { UserDetails } from '../services/shared/user.details';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  profilePic?: string;

  user?: UserDetails;

  constructor(public dbService: DbService, private communicationService:CommonService) {}

  logOut(){
    window.location.reload();
    this.dbService.logOut();
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
