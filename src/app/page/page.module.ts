import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { UsersComponent } from './users/users.component';
import { QuestionComponent } from './question/question.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { PaperComponent } from './paper/paper.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    UsersComponent,
    QuestionComponent,
    AddquestionComponent,
    PaperComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PageModule { }
