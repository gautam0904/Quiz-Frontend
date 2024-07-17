import { Component, OnInit } from '@angular/core';
import { IAllResultgetApiResponse } from 'src/app/core/interfaces/all-resultget-api-response';
import { Iresult } from 'src/app/core/interfaces/iresult';
import { Iuser } from 'src/app/core/interfaces/user';
import { PaperService } from 'src/app/core/services/paper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user !: Iuser
  results: Iresult[] = [];
  levels: number[] = [];
  constructor(
    private paperService: PaperService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  ngOnInit(): void {
    this.levels = Array.from({ length: 100 }, (_, i) => i + 1);
    this.paperService.getAllResults(this.user._id as string).subscribe({
      next: (res: IAllResultgetApiResponse) => {
        this.results = res.data
      },
      error: (err: any) => {
      }  // Add error handling code here
    })
  }
}
