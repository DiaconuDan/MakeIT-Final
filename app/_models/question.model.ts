import {AnswerModel} from './answer.model';
export class QuestionModel {
    text:  string;
    category : string;
    difficulty : string;
    rightAnswer : string;
    answers : AnswerModel[]
}


