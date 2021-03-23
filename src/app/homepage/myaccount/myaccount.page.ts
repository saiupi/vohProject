import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '@app/service-module/user-profile.service';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  userDetails: any;
  nameChange = true;
  userName: string;
  iconName: string;
  userNameShow: string;
  // noRequired: boolean = false;
  constructor(private userProfileService: UserProfileService) {
    // this.noRequired = false;
    // this.userDetails = this.userProfileService.getUserDetails();
    // this.UserName();
    // this.userProfileService.currentUserProfileData.subscribe((res) => {
    //   this.userDetails = this.userProfileService.getUserDetails();
    //   console.log(res, this.userDetails);
    //   this.UserName();
    // });
  }

  // UserName() {
  //   this.userName = this.userDetails.firstName;
  //   if (this.userName) {
  //     let nameOfUser = this.userName;
  //     nameOfUser = nameOfUser.substring(1);
  //     this.nameChange = false;
  //     this.iconName =
  //       this.userName[0].toUpperCase() + this.userName[1].toLowerCase();
  //     this.userNameShow =
  //       this.userName[0].toUpperCase() + nameOfUser.toLowerCase();
  //   }
  // }

  ngOnInit() {
    // this.UserName();
    // console.log(this.userDetails.firstName, 'userDetails');
  }
  // hidePage() {
  //   this.noRequired = true;
  // }
  // showPage() {
  //   this.noRequired = false;
  // }
}
