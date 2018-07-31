import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class UserService {
  usersList;
  userInfo: AngularFireList<any>;
  constructor(
    public db: AngularFirestore,
    private firebase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject("No user logged in");
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name,
          photoURL: user.photoURL
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  // updateCurrentUserRank(value){
  //   return new Promise((resolve, reject) => {
  //     var user = firebase.auth().currentUser;
  //     user.updateProfile({
  //       displayName: value,
  //       photoURL: user.photoURL
  //     }).then(res => {
  //       resolve(res)
  //     }, err => reject(err))
  //   })
  // }
  getCurrentUserInfo(uid) {
    // this.firebase.list('/users', ref => ref.where('size', '==', 'large'))
    // this.firebase.collection('users', ref => ref.where('size', '==', 'large'))

    this.userInfo = this.firebase.list("users/" + uid);
    return this.userInfo;
  }
  getUserByRank() {
    this.usersList = this.firebase.list("users", ref =>
      ref.orderByChild("rank")
    );
    return this.usersList;
  }
  getAllUsers() {
    this.usersList = this.firebase.list("users");
    return this.usersList;
  }
  getAllOnlineUsers() {
    return this.firebase.list("users", ref =>
      ref.orderByChild("connected").equalTo(true)
    );
  }
  getUserProfile(uid) {
    let info = this.firebase.list("users", ref =>
      ref.orderByChild("uid").equalTo(uid)
    );
    return info;
  }
}
