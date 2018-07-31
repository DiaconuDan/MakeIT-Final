import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { MessageModel, PrivateMessageModel } from "../_models/message.model";
import { ChatService } from "../core/chat.service";
import { UserService } from "../core/user.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  messagesList = [];
  privateMessagesList = [];
  usersList = [];
  message: MessageModel = new MessageModel();
  privateMessage: PrivateMessageModel = new PrivateMessageModel();
  messageText;
  currentUser;
  privateCon: boolean = false;
  senderId = "";
  constructor(
    private db: AngularFireDatabase,
    private chatService: ChatService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.getCurrentUserLoggedIn();
    this.getAllMessages();
    this.getAllUsers();
  }
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  getAllMessages() {
    var list = this.chatService.getGlobalChatMessages();
    list.snapshotChanges().subscribe(item => {
      this.messagesList = [];
      item.forEach(element => {
        var mess = element.payload.toJSON();
        this.messagesList.push(mess as MessageModel);
      });
    });
  }
  getCurrentUserLoggedIn() {
    this.userService.getCurrentUser().then(
      res => {
        this.currentUser = res;
      },
      err => {
        this.currentUser = {};
      }
    );
  }
  sendMessage() {
    if (this.privateCon == false) {
      this.message.text = this.messageText;
      this.message.date = Date.now().toString();
      this.message.userId = this.currentUser.uid;
      this.chatService.addMessageGlobalChat(this.message);
      this.messageText = "";
    } else {
      this.privateMessage.text = this.messageText;
      this.privateMessage.userId = this.currentUser.uid;
      this.privateMessage.date = Date.now().toString();
      this.privateMessage.senderId = this.senderId;
      this.chatService.addMessagePrivateConv(this.privateMessage);
      this.messageText = "";
    }
  }
  getAllUsers() {
    var list = this.userService.getAllUsers();
    list.snapshotChanges().subscribe(item => {
      this.usersList = [];
      item.forEach(element => {
        var user = element.payload.toJSON();
        this.usersList.push(user);
      });
    });
  }
  openPrivateConversation(uid) {
    this.privateMessagesList = [];
    this.senderId = uid;
    var list = this.chatService.getPrivateChatMessages(this.senderId);
    list.snapshotChanges().subscribe(item => {
      this.privateMessagesList = [];
      item.forEach(element => {
        var mess = element.payload.toJSON();
        this.privateMessagesList.push(mess as PrivateMessageModel);
      });
    });
    this.privateCon = true;
  }
  goToGlobalChat() {
    this.privateCon = false;
  }
}
