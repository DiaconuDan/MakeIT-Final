import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Components
import { BsModalComponent } from "ng2-bs3-modal";
import { NavbarComponent } from "../navbar/navbar.component";
import { AddQuestionModalComponent } from "./add-question-modal/add-question-modal.component";

//Models
import { QuestionModel } from "./../_models/question.model";

//Services
import { NgxSpinnerService } from "ngx-spinner";
import { QuestionsService } from "../core/questions.service";
@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"]
})
export class AdminPanelComponent implements OnInit {
  @ViewChild("add") addQuestionModal: AddQuestionModalComponent;
  @ViewChild("confirmDelete") confirmDelete: BsModalComponent;

  questionList = [];
  addQuestionForm: FormGroup;
  questionKey;
  constructor(
    private questionService: QuestionsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.getQuestions();
      this.spinner.hide();
    }, 1000);
  }

  openAddQuestionModal() {
    //this.createForm();
    this.addQuestionModal.openModal();
  }
  getQuestions() {
    var list = this.questionService.getAllQuestions();
    list.snapshotChanges().subscribe(item => {
      this.questionList = [];
      item.forEach((element: any) => {
        var question = element.payload.toJSON();
        question["$key"] = element.key;
        this.questionList.push(question);
      });
    });
    console.log(this.questionList);
  }
  createForm() {
    this.addQuestionForm = this.fb.group({
      text: ["", Validators.required],
      category: [1, Validators.required],
      difficulty: ["", Validators.required],
      answer1: ["", Validators.required],
      answer2: ["", Validators.required],
      answer3: ["", Validators.required],
      answer4: ["", Validators.required],
      rightAnswer: ["", Validators.required]
    });
  }

  onDelete($key) {
    this.questionKey = $key;
    this.confirmDelete.open();
    // this.questionService.deleteQuestion($key);
  }
  closeModal() {
    this.confirmDelete.dismiss();
  }
  deleteQuestion() {
    this.questionService.deleteQuestion(this.questionKey);
    this.closeModal();
  }
}
