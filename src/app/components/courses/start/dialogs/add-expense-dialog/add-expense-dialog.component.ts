import { Expense } from './../../../../../models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { AllCoursesService } from 'src/app/services/all-courses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent {

  expense: Expense = {};

  anyfildEmpty: boolean = false;
  selectedCourse: number = this.courseId;
  courses: Course[] = [];

  expenseForm: UntypedFormGroup = this.formBuilder.group({
    courseId: ['', [Validators.required]],
    cost: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    emission: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public courseId: number,
    private courseService: AllCoursesService,
    private formBuilder: UntypedFormBuilder,
    private expenseService: ExpenseService,
    private toast: ToastrService
  ) {
    this.getCourses();
    if (courseId && courseId != 0) this.expenseForm.get('courseId')?.setValue(courseId);
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe({
      next: res => this.courses = res,
      error: error => console.log(error)
    })
  }

  joinFormWithExpense(): void {
    this.expense.course = {id: this.expenseForm.get('courseId')?.value, name: ''};
    this.expense.cost = this.expenseForm.get('cost')?.value;
    this.expense.description = this.expenseForm.get('description')?.value;
    this.expense.emission = this.expenseForm.get('emission')?.value;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    if (this.expenseForm.valid) {
      this.anyfildEmpty = false;
      this.joinFormWithExpense();
      this.expenseService.create(this.expense).subscribe({
        next: res => {
          this.toast.success('Despesa Criada')
          this.dialogRef.close(true);
        },
        error: error => {
          this.toast.error('Ops.. Tivemos algum problema')
          this.dialogRef.close(false)
        }
      });
    }else {
      this.anyfildEmpty = true;
    }
  }

}
