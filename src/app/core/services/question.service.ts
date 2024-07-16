import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iquestion} from '../interfaces/question';
import { catchError, Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { QuestiongetApiResponse } from '../interfaces/questionget-api-response';
import { QuestionCreateApiResponse } from '../interfaces/question-create-api-response';
import { IDeleteApiResponse } from '../interfaces/delete-api-response';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  getQuestion(): Observable<QuestiongetApiResponse> {
    return this.http.get<QuestiongetApiResponse>('/question/get').pipe(
  
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

  createQuestion(updateData: Iquestion): Observable<QuestionCreateApiResponse> {
    return this.http.post<QuestionCreateApiResponse>('/question/create', updateData).pipe(
      tap((resdata: QuestionCreateApiResponse) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: resdata.message,
        });
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

  deleteQuestion(id: string): Observable<IDeleteApiResponse> {
    return this.http.delete<IDeleteApiResponse>(`/question/delete/${id}`).pipe(
      tap((resdata: IDeleteApiResponse) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: resdata.message,
        });
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

  updateQuestion(updateData: Iquestion): Observable<QuestionCreateApiResponse> {
    return this.http.put<QuestionCreateApiResponse>(`/question/update/${updateData._id}`, updateData).pipe(
      tap((resdata: QuestionCreateApiResponse) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: resdata.message,
        });
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
}

