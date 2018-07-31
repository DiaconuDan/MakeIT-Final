import { CarouselComponent } from "angular2-carousel";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { QuestionsService } from "../../core/questions.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "play-turbo-game",
  templateUrl: "./play-turbo-game.component.html",
  styleUrls: ["./play-turbo-game.component.scss"]
})
export class PlayTurboGameComponent implements OnInit {
  @ViewChild("topCarousel") topCarousel: CarouselComponent;

  @Input() selectedUser;
  @Input() currentUser;
  @Input() gameId;
  selectedAnswer: Number;
  currentGame;
  questionList = [];
  private totalScore = 0;
  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getQuestions();
  }
  setClickedAnswer(answear) {
    this.selectedAnswer = answear.id;
  }
  goNextQuestion(question) {
    console.log(this.selectedAnswer);
    if (this.selectedAnswer == question["rightAnswer"]) {
      this.totalScore += 10;
    }
  
    this.topCarousel.slideNext();
  }
  getQuestions() {
    var list = this.questionService.getAllQuestions();
    list.snapshotChanges().subscribe(item => {
      item.forEach((element: any) => {
        var question = element.payload.toJSON();
        question["$key"] = element.key;
        question["ans"] = [];
        question["ans"] = Object.keys(question.answers).map(key => {
          return question.answers[key];
        });
        this.questionList.push(question);
        console.log(this.questionList);
      });
    });
  }
  reachedEndCounter($end) {
    console.log("END");
    this.topCarousel.slideTo(this.questionList.length + 1);
    // console.log(this.currentUser.uid + " " + this.totalScore);
    // this.questionService.updatePointsTurboGame(
    //   this.gameId,
    //   this.currentUser.uid,
    //   this.totalScore
    // );
  }
  onReachEnd($event) {
    console.log("onReachEnd");
    console.log(this.currentUser.uid + " " + this.totalScore);
    // if (this.currentUser.uid == "U6vOnQApdRgw8F2nrbtN1u4qwx73") {
    //   //Dan diaconu
    //   // setTimeout(() => {
    //   //   this.toastr.info("You won in 9 sec. Alexandru scored 20 points in 15sec!");
    //   // }, 12000);
    // } else {
    //   // this.toastr.info("You lost in 15 sec. Dan scored 60 points in 9 sec!");
    // }
    // // this.questionService.updatePointsTurboGame(
    // //   "c8aa15d0-7afb-11e8-8233-25a684aa3edd",
    // //   this.currentUser.uid,
    // //   this.totalScore
    // // );
    let self = this;
    this.questionService
      .getCurrentGameInfo("c8aa15d0-7afb-11e8-8233-25a684aa3edd")
      .snapshotChanges()
      .subscribe(item => {
        item.forEach((element: any) => {
          self.currentGame = element.payload.toJSON();
          console.log(self.currentGame);
        });
      });
  }
}
