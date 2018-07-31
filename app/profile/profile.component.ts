import { UserService } from "./../core/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  currentUser;
  userProfile;
  constructor(private userService: UserService, private router: Router) {
    this.getCurrentUserLoggedIn();
  }

  ngOnInit() {}
  getCurrentUserLoggedIn() {
    this.userService.getCurrentUser().then(
      res => {
        this.currentUser = res;
        this.getCurrentUserInfo();
      },
      err => {
        this.currentUser = {};
      }
    );
  }
  getCurrentUserInfo() {
    var list = this.userService.getUserProfile(this.currentUser.uid);
    list.snapshotChanges().subscribe(item => {
      item.forEach((element: any) => {
        this.userProfile = element.payload.toJSON();
      });
    });
  }
}
