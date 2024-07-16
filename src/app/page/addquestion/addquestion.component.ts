import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iquestion } from 'src/app/core/interfaces/question';
import { QuestionCreateApiResponse } from 'src/app/core/interfaces/question-create-api-response';
import { QuestionService } from 'src/app/core/services/question.service';
import { SharedService } from 'src/app/core/services/shared.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.scss']
})
export class AddquestionComponent implements OnInit, OnDestroy {
  isedit: boolean = false;
  questionForm!: FormGroup;
  clonequestion: Iquestion | undefined;
  loading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private sharedService: SharedService,

  ) {
    this.questionForm = this.fb.group({
      _id: [""],
      name: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required],
      hardness: ['', [Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(10)]],
    });

  }

  ngOnInit(): void {
    this.subscription.add(
      this.sharedService.QuestionForm$.subscribe(q => {
        this.clonequestion = q;
        this.setInitialValues();
      })
    );
  }

  setInitialValues() {

    if (this.clonequestion) {
      this.isedit =true;
      this.questionForm.patchValue({
        _id: this.clonequestion._id,
        question: this.clonequestion.question,
        answer: this.clonequestion.answer,
        optionA: this.clonequestion.optionA,
        optionB: this.clonequestion.optionB,
        optionC: this.clonequestion.optionC,
        optionD: this.clonequestion.optionD,
        hardness: this.clonequestion.hardness,
      });
    } 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onupdate() {
    this.loading = true;
    this.questionService.updateQuestion(this.questionForm.value).subscribe({
      next: (resdata: QuestionCreateApiResponse) => {
        this.questionForm.reset()
        this.isedit = false;
        this.router.navigate(['/page']);
      },
      error: (err: any) => {
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.questionForm.valid) {
      this.questionService.createQuestion(this.questionForm.value).subscribe({
        next: (resdata: any) => {
          this.loading = false;
          this.router.navigate(['/page']);
        },
        error: (res: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          });
          this.loading = false;
        }
      });
    }
  }
}
