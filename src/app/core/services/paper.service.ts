import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { QuestiongetApiResponse } from '../interfaces/questionget-api-response';
import Swal from 'sweetalert2';

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
  getResult(): Observable<QuestiongetApiResponse> {
    return this.http.post<QuestiongetApiResponse>('/result/get',{}).pipe(
    //   tap((resdata: QuestiongetApiResponse) => {
    //   const { value: formValues } = await Swal.fire({
    //     title: "Multiple inputs",
    //     html: `
    //       <div class="container-fluid">
    //         <div class="row">
    //           <div>
    //             <h4> Marks : </h4> ${resdata.userResult.marks}
    //           </div>
    //           <div>
    //             <h4> Total Result : </h4> ${resultData.userResult.totalResult}
    //           </div>
    //           <div>
    //             <h4>Paper Hardness : </h4> ${resultData.userResult.paperhardness}
    //           </div>
    //         </div>
    //       </div>
    //     `,
    //     focusConfirm: false,
    //   });
    // })
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
