import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { QuestiongetApiResponse } from '../interfaces/questionget-api-response';
import Swal from 'sweetalert2';
import { IResultgetApiResponse } from '../interfaces/resultget-api-response';
import { IAllResultgetApiResponse } from '../interfaces/all-resultget-api-response';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private http: HttpClient) { }

  
  getPaper(): Observable<QuestiongetApiResponse> {
    return this.http.get<QuestiongetApiResponse>('/paper/create').pipe(
  
      catchError((error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }
  getResult(paperform :any): Observable<IResultgetApiResponse> {
    const ans: { question: string, answer: string }[] = [];
    for (let i = 0; i < 10; i++) { 
      const answerKey = `answer${i}`;
      const questionIdKey = `questionId${i}`;
    
      if (paperform.hasOwnProperty(answerKey) && paperform.hasOwnProperty(questionIdKey) && paperform[questionIdKey] !== '') {
        ans.push({
          question: paperform[questionIdKey],
          answer: paperform[answerKey]
        });
      }
    }
    return this.http.post<IResultgetApiResponse>('/result/get',{userpaper : ans}).pipe(
      tap((resdata: IResultgetApiResponse) => {
        Swal.fire({
          title: "Multiple inputs",
          html: `
            <div class="container-fluid">
              <div class="row">
                <div>
                  <h4> Marks : </h4> ${resdata.data.marks}
                </div>
                <div>
                  <h4> Your Level : </h4> ${resdata.data.level}
                </div>
              </div>
            </div>
          `,
          focusConfirm: false,
        });
        return resdata;
      }),
      catchError((error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }

  getAllResults(id : string): Observable<IAllResultgetApiResponse> {
    return this.http.get<IAllResultgetApiResponse>(`/result/getAll/:${id}`).pipe(
  
      catchError((error: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }
 
}
