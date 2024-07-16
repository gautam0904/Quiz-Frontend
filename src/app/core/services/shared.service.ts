import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { Iquestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private QuestionForm = new BehaviorSubject<Iquestion | undefined>(undefined);
  private sidebarState = new BehaviorSubject<boolean>(false);
  private profile = new BehaviorSubject<Iuser | undefined>(undefined);
  sidebarState$ = this.sidebarState.asObservable();
  profile$ = this.profile.asObservable();
  QuestionForm$ = this.QuestionForm.asObservable();


  toggleSidebar(value: boolean) {
    this.sidebarState.next(value);
  }
  setQuestionData(value: Iquestion) {
    this.QuestionForm.next(value);
  }
  setProfileData(value: Iuser) {
    this.profile.next(value);
  }


}
