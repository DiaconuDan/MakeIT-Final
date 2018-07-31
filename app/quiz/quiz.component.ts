import { Component, OnInit, ViewChild } from "@angular/core";
import { CarouselComponent } from "angular2-carousel";
import { Observable } from "rxjs";
//Services
import { QuestionsService } from "../core/questions.service";
import { UserService } from "../core/user.service";
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  @ViewChild("topCarousel") topCarousel: CarouselComponent;
  selectedAnswer: Number;
  private questionList = [];
  private currentAnswer;
  private totalScore = 0;
  private currentUser;
  private gameType: string = "";
  private categories: Array<String> = ["java", "python", "c/c++"];
  private selectedCategory: String = "";
  private selectedGameType: boolean = false;
  constructor(
    private questionService: QuestionsService,
    private userService: UserService
  ) {
    this.getQuestionCategory();
  }
  ngOnInit() {}
  getQuestionCategory() {
    var list = this.questionService.getAllQuestions();
    list.snapshotChanges().subscribe(item => {
      this.questionList = [];
      item.forEach((element: any) => {
        var question = element.payload.toJSON();
        question["$key"] = element.key;
        question["ans"] = [];
        question["ans"] = Object.keys(question.answers).map(key => {
          return question.answers[key];
        });
        if (question.category == "Java") {
          this.questionList.push(question);
        }

        console.log(this.questionList);
      });
    });
  }

  goNextQuestion(question) {
    console.log(this.selectedAnswer);
    if (this.selectedAnswer == question["rightAnswer"]) {
      this.totalScore += 10;
    }
    this.topCarousel.slideNext();
  }
  goBackQuestion() {
    this.topCarousel.slidePrev();
  }
  setClickedAnswer(answear) {
    this.selectedAnswer = answear.id;
  }
  onReachEnd($event) {
    console.log("Total Score is " + this.totalScore);
    this.userService.getCurrentUser().then(user => {
      console.log(user.uid);
      // var list = this.userService.getCurrentUserInfo(user.uid);
      // list.snapshotChanges().subscribe(item => {
      //   console.log(item)
      // })
    });
  }
  startNomalGame() {
    console.log("startNomalGame");
    this.gameType = "normal";
  }
  startTurboGame() {
    console.log("startTurboGame");
    this.gameType = "turbo";
  }
  reachedEnd($end) {
    console.log("END");
    this.topCarousel.slideTo(this.questionList.length + 1);
  }
  selectCategory(item) {
    this.selectedCategory = item;
    this.getQuestionCategory();
    //get question by category
  }
  selectGameType() {
    this.selectedGameType = true;
  }
}
