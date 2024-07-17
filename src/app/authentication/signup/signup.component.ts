import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../core/interfaces/user';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isedit: boolean = false
  profile: Iuser | undefined = undefined
  signupForm!: FormGroup;
  selectedFile : File | undefined = undefined;
  selectedRole!: string;
  loading: boolean = false;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {


    this.signupForm = this.fb.group({
      _id: [this.profile?._id],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profilePicture: [null, Validators.required],
      role: ['user', Validators.required]
    })
  }

  ngOnInit(): void {

      this.sharedService.profile$.subscribe(p => {
        this.profile = p;
        this.setInitialValues();
      })
  }

  setInitialValues() {

    if (this.profile) {
      this.isedit = true;
      this.signupForm.patchValue({
        _id: this.profile._id,
        name: this.profile.name,
        email: this.profile.email,
      });
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target && event.target.result && this.profile ) {
          this.profile.profilePicture = event.target.result as string;
        }
      }
    } 

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
    }
  }

  onupdate() {
    this.loading = true;
    if (this.selectedFile) {
      this.userService.update(this.signupForm.value, this.selectedFile).subscribe({
        next: (resdata: any) => {
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: resdata.message,
          });
          const localUser = JSON.parse(localStorage.getItem('user') as string)
          if (localUser == this.profile) {
            const token = localStorage.getItem('token') as string;
            localStorage.clear();
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(resdata));
          }
          this.signupForm.reset(); 
          this.isedit=false
          this.loading = false;
          this.router.navigate(['/page'])
        },
        error: (res: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          });
          this.loading = false;
        }
  
      }) 
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.signupForm.valid && this.selectedFile) {
      this.userService.signup(this.signupForm.value, this.selectedFile).subscribe({
        next: (resdata: any) => {
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: resdata.message,
          });
          this.loading = false;
          this.router.navigate(['/auth'])
        },
        error: (res: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          });
          this.loading = false;
        }
      })
    }
  }

}
