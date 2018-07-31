import { Component, OnInit } from "@angular/core";
import { UserService } from "../core/user.service";
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: "app-rank-top",
  templateUrl: "./rank-top.component.html",
  styleUrls: ["./rank-top.component.css"]
})
export class RankTopComponent implements OnInit {
  private userList = [];
  private userRankList = [];
  private currentUser;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserRankList();
    this.getCurrentUser();
  }
  getUserRankList() {
    var list = this.userService.getUserByRank();
    list.snapshotChanges().subscribe(item => {
      this.userList = [];
      item.forEach((element: any) => {
        var user = element.payload.toJSON();
        this.userList.push(user);
      });
    });
    console.log(this.userList);
  }
  getCurrentUser() {
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      console.log(user);
    });
  }
}
