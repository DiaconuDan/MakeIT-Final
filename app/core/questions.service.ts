import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { QuestionModel } from "../_models/question.model";

@Injectable()
export class QuestionsService {
  questionList: AngularFireList<any>;
  gameIdRef;

  constructor(private firebase: AngularFireDatabase) {}

  getAllQuestions() {
    this.questionList = this.firebase.list("questions");
    return this.questionList;
  }

  insertQuestion(question: QuestionModel) {
    this.questionList.push({
      text: question.text,
      difficulty: question.difficulty,
      category: question.category,
      answers: question.answers
    });
  }

  updateQuestion(question: QuestionModel, $key) {
    this.questionList.update($key, {
      text: question.text,
      difficulty: question.difficulty,
      category: question.category,
      answers: question.answers
    });
  }

  deleteQuestion($key: string) {
    this.questionList.remove($key);
  }
  // ================= TURBO ======================
  createTuboGame(gameId, currentUserId, selectedUserId) {
    this.firebase.list("turboGames").push({
      gameId,
      currentUser: {
        uid: currentUserId,
        points: 0
      },
      selectedUser: {
        uid: selectedUserId,
        invitation: true,
        points: 0
      }
    });
  }
  setGameStartOpponnent(selectedUserId) {
    // this.firebase.object("turboGames/" + selectedUserId).set({
    //   gameStart: 1
    // });
    // let list = this.firebase
    //   .list("turboGames", ref => ref.orderByChild("selectedUser").equalTo(gameId))
    //   .snapshotChanges()
    //   .subscribe(item => {
    //     item.forEach((element: any) => {
    //       self.gameIdRef = element.key;
    //     });
    //   });
    // self.firebase.list("turboGames/" + self.gameIdRef).update(currentUserId, {
    //   points: totalScore
    // });
  }

  getCurrentGameInfo(gameId) {
    let list = this.firebase.list("turboGames", ref =>
      ref.orderByChild("gameId").equalTo(gameId)
    );
    return list;
  }
  sendGameInvitation(gameId, selectedUserId) {
    let self = this;
    let list = this.firebase
      .list("turboGames", ref => ref.orderByChild("gameId").equalTo(gameId))
      .snapshotChanges()
      .subscribe(item => {
        item.forEach((element: any) => {
          self.gameIdRef = element.key;
        });
      });
    self.firebase.list("turboGames/" + self.gameIdRef).update(selectedUserId, {
      invitation: true
    });
  }
  deleteTuboGame(gameId) {
    console.log(gameId);
    let turboGames = this.firebase.list("turboGames");
    let self = this;
    // //db.list('/turboGames', ref => ref.orderByChild('size').equalTo('large'))
    let currentGame = this.firebase
      .list("/turboGames", ref => ref.orderByChild("gameId").equalTo(gameId))
      .snapshotChanges()
      .subscribe(item => {
        item.forEach((element: any) => {
          self.gameIdRef = element.key;
          console.log(self.gameIdRef);
        });
      });
    turboGames.remove(self.gameIdRef);
  }
  getTurboGames() {
    let list = this.firebase.list("turboGames");
    return list;
  }
  updatePoints() {
    this.firebase
      .list("turboGames/-LG6M6I6fSLbZvmPxz36/")
      .update("selectedUser", {
        points: 100
      });
  }
  updatePointsTurboGame(gameId, currentUserId, totalScore) {
    console.log(gameId);
    let self = this;

    self.firebase
      .list("turboGames/-LG6WCSVN5M77z7Nd80F")
      .snapshotChanges()
      .subscribe(item => {
        item.forEach((element: any) => {
          if (element.payload.toJSON().currentUser.uid == currentUserId) {
            self.gameIdRef = "currentUser";
          } else {
            self.gameIdRef = "selectedUser";
          }
        });
      });
    self.firebase
      .list("turboGames/-LG6WCSVN5M77z7Nd80F")
      .update(self.gameIdRef, {
        points: totalScore
      });
  }
  getQuestionByCategory(category) {
    let list = this.firebase.list("questions");
    return list;
  }
}
