import { BsModalComponent } from "ng2-bs3-modal";
import { QuestionsService } from "../core/questions.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { PlayTurboGameComponent } from "./play-turbo-game/play-turbo-game.component";
import { UserService } from "./../core/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import * as uuidv1 from "uuid/v1";
@Component({
  selector: "app-find-match",
  templateUrl: "./find-match.component.html",
  styleUrls: ["./find-match.component.css"]
})
export class FindMatchComponent {
  onlineUsers = [];
  selectedUser;
  selectedUserId;
  startGame: boolean = false;
  gameId;
  currentUser;
  message: string = "";

  @ViewChild("confirmGame") confirmModal: BsModalComponent;
  constructor(
    private userService: UserService,
    private questionService: QuestionsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.spinner.show();

    this.getCurrentUserLoggedIn();
    this.getOnlineUsers();

    //this.getGameInvitation();
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getOnlineUsers() {
    var list = this.userService.getAllOnlineUsers();
    let self = this;
    list.snapshotChanges().subscribe(item => {
      this.onlineUsers = [];
      item.forEach((element: any) => {
        let user = element.payload.toJSON();
        if (user.uid != self.currentUser.uid) {
          this.onlineUsers.push(user);
        }
      });
    });
  }
  getCurrentUserLoggedIn() {
    this.userService.getCurrentUser().then(
      res => {
        this.currentUser = res;
        let turboGames = this.questionService.getTurboGames();
        let self = this;
        turboGames.snapshotChanges().subscribe(item => {
          item.forEach((element: any) => {
            let turboGame = element.payload.toJSON();
            //self.selectedUserId = turboGame.selectedUser.uid;
            self.gameId = turboGame.gameId;
            if (turboGame.selectedUser.uid == self.currentUser.uid) {
              if (turboGame.selectedUser.invitation == true) {
                self.message =
                  "You received an invitation to play a turbo game!";
                self.confirmModal.open();
              }
            } else {
              this.startGame = true;
            }
          });
        });
      },
      err => {
        this.currentUser = {};
      }
    );
  }
  selectUserFromList(user) {
    this.selectedUser = user;
  }
  invitePlayer() {
    this.gameId = uuidv1();
    this.questionService.createTuboGame(
      this.gameId,
      this.currentUser.uid,
      this.selectedUser.uid
    );
    localStorage.setItem("gameId", this.gameId);
    //show the spinner till the player accepted the invitation
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    console.log(this.gameId);

    //send invitation
    // this.questionService.sendGameInvitation(this.gameId, this.selectedUser.uid);
    //let turboGames = this.questionService.getCurrentGameInfo(this.gameId);
    // let self = this;
    // turboGames.snapshotChanges().subscribe(item => {
    //   item.forEach((element: any) => {
    //     let turboGame = element.payload.toJSON();
    //     console.log(turboGame.selectedUser.uid);
    //     console.log(self.currentUser.uid);
    //     //Send invitation for opponnent
    //     //this.questionService.setGameStartOpponnent(this.selectedUser.uid);
    //     // if (turboGame.selectedUser.uid == self.currentUser.uid) {
    //     //   console.log("Selected user is diff than the logged one");
    //     //   if (turboGame.selectedUser.gameStart == 1) {
    //     //     self.confirmModal.open();
    //     //   }
    //     // }
    //   });
    // });
    //this.startGame = true;
  }
  acceptInvitation() {
    this.startGame = true;
  }
  refuseInvitation() {
    this.confirmModal.dismiss();
    let gameInvitationId = localStorage.getItem("gameId");
    console.log("CUrrentUser " + this.currentUser.uid);
    console.log("selectedUserId" + this.selectedUserId);
    // console.log(gameInvitationId);
    // this.questionService.getCurrentGameInfo(gameInvitationId);
    if (this.currentUser.uid != this.selectedUserId) {
      this.toastr.error(
        "Select another online user :)",
        "User refused the invitation !"
      );
    }
  }
  deleteGame() {
    this.confirmModal.dismiss();
  }
}
