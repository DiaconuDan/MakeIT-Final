import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal';
import { QuestionsService } from '../../core/questions.service';
import { QuestionModel } from '../../_models/question.model';
import * as uuidv1 from  'uuid/v1';

@Component({
  selector: 'add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent implements OnInit {
  @ViewChild('addQuestion') addQuestionModal: BsModalComponent;
  addQuestionForm: FormGroup;
  constructor(private fb: FormBuilder,private questionService:QuestionsService) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.addQuestionForm = this.fb.group({
      text: ['', Validators.required ],
      category: [1,Validators.required],
      difficulty: ['',Validators.required],
      answer1: ['',Validators.required],
      answer2: ['',Validators.required],
      answer3: ['',Validators.required],
      answer4: ['',Validators.required],
      rightAnswer: ['',Validators.required]
    });
  }
  openModal(){
    this.addQuestionModal.open();
  }
  closeModal(){
    this.addQuestionModal.close();
  }
  add(){
    console.log('test')
    console.log(this.addQuestionForm.value);
    let question  = new QuestionModel();
    question.text = this.addQuestionForm.value.text;
    question.category = this.addQuestionForm.value.category;
    question.difficulty = this.addQuestionForm.value.difficulty;
    question.answers = [];
    question.answers.push({
      id:uuidv1(),
      text:this.addQuestionForm.value.answer1
    });
    question.answers.push({
      id:uuidv1(),
      text:this.addQuestionForm.value.answer2
    });
    question.answers.push({
      id:uuidv1(),
      text:this.addQuestionForm.value.answer3
    });
    question.answers.push({
      id:uuidv1(),
      text:this.addQuestionForm.value.answer4
    });
    question.rightAnswer =  this.addQuestionForm.value.rightAnswer;
    console.log(question);
    this.questionService.insertQuestion(question);
    this.addQuestionForm.reset("*");
    this.addQuestionModal.close();
  }
}
