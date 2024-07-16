import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/user';
import { catchError, Observable, tap } from 'rxjs';
import { IuserGetApiResponse } from '../interfaces/iuser-get-api-response';
import Swal from 'sweetalert2';
import { IDeleteApiResponse } from '../interfaces/delete-api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(loginData: Iuser) {
    return this.http.post('/user/login', {
      "email": loginData.email,
      "password": loginData.password
    })
  }

  update(updateData: Iuser, imageFile: File) {
    if (updateData.profilePicture) {
      const updateformData = new FormData();
      updateformData.append('name', updateData.name);
      updateformData.append('email', updateData.email);
      updateformData.append('profilePicture', imageFile, imageFile.name);


      return this.http.put(`/user/updatepicture/${updateData._id}`, updateformData)

    } else {
      return this.http.put('/user/update', updateData)
    }
  }

  signup(signupData: Iuser, imageFile: File) {

    const formData = new FormData();
    formData.append('name', signupData.name);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('role', signupData.role);
    formData.append('profilePicture', imageFile, imageFile.name);

    return this.http.post('/user/signup', formData)
  }

  getAllusers(): Observable<IuserGetApiResponse> {
    return this.http.get<IuserGetApiResponse>('/user/getAll').pipe(
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

  deleteUser(userId: string): Observable<IDeleteApiResponse>{
    return this.http.delete<IDeleteApiResponse>(`/user/delete/${userId}`).pipe(
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

}
