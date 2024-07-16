import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDeleteApiResponse } from 'src/app/core/interfaces/delete-api-response';
import { IuserGetApiResponse } from 'src/app/core/interfaces/iuser-get-api-response';
import { Iuser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router
  ){}

  users : Iuser[] =[]
  role !: string 
  loading : boolean = false;

  ngOnInit(): void {
    const localuser =  JSON.parse(localStorage.getItem('user') as string);
    this.role = localuser.role;
    this.userService.getAllusers().subscribe({
      next : (resData : IuserGetApiResponse) =>{
        this.users = resData.data
      },
      error: (err: any) => {
      } 
    })
  }

  ondelete(user : Iuser){
    this.loading = true;
    this.userService.deleteUser(user._id as string).subscribe({
      next: (resdata: IDeleteApiResponse) => {
        this.loading = false;
        this.users = this.users.filter(u => u._id!== user._id)
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }
}
