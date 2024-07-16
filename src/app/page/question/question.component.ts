import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDeleteApiResponse } from 'src/app/core/interfaces/delete-api-response';
import { Iquestion } from 'src/app/core/interfaces/question';
import { QuestionCreateApiResponse } from 'src/app/core/interfaces/question-create-api-response';
import { QuestiongetApiResponse } from 'src/app/core/interfaces/questionget-api-response';
import { QuestionService } from 'src/app/core/services/question.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: Iquestion[] = [];
  loading = false;

  constructor(
    private questionService: QuestionService,
    private sharedService: SharedService,
    private router : Router 
  ) { }
  ngOnInit(): void {
    this.loading = true;
    this.questionService.getQuestion().subscribe({
      next: (resdata: QuestiongetApiResponse) => {
        this.questions = resdata.data
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      } 
    })
  }

  onedit(q : Iquestion) {
    this.loading = true;
    this.sharedService.setQuestionData(q);
    this.router.navigate(['page/addQuestion'])
  }

  ondelete(question : Iquestion){
    this.loading = true;
    this.questionService.deleteQuestion(question._id as string).subscribe({
      next: (resdata: IDeleteApiResponse) => {
        this.loading = false;
        this.questions = this.questions.filter(q => q._id!== question._id)
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }
}
