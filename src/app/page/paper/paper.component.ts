import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaperService } from 'src/app/core/services/paper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent {
  paper: any;
  paperform!: FormGroup;

  constructor(private fb: FormBuilder, private paperservice: PaperService ,private router :Router) { }

  onSubmit() {
    if (this.paperform.valid) {
      console.log(this.paperform.value);
      
      this.paperservice.getResult().subscribe({
        next: async (resultData: any) => {
          
          this.router.navigate(['/page/user']);
        },
        error: (res) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.error.message,
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.paperservice.getPaper().subscribe({
      next: (resData: any) => {
        this.paper = resData.data;
        
        let formControls: any = {}; // Define formControls as an empty object
        this.paper.forEach((question: { _id: any; }, index: string) => {
          formControls['answer' + index] = ['', Validators.required];
          formControls['questionId' + index] = [question._id];
        });

        this.paperform = this.fb.group(formControls); // Assign formControls to the FormGroup
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.error.message,
        });
      }
    });
  }
}
