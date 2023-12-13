import { Expense } from '../../../../../models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { AllCoursesService } from 'src/app/services/all-courses.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-update-expense-dialog',
  templateUrl: './update-expense-dialog.component.html',
  styleUrls: ['./update-expense-dialog.component.scss']
})
export class UpdateExpenseDialogComponent {

  expense: Expense = {};

  anyfildEmpty: boolean = false;
  courses: Course[] = [];

  expenseForm: UntypedFormGroup = this.formBuilder.group({
    courseId: ['', [Validators.required]],
    cost: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    emission: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public expenseEntity: Expense,
    private courseService: AllCoursesService,
    private formBuilder: UntypedFormBuilder,
    private expenseService: ExpenseService,
    private toast: ToastrService
  ) {
    this.expense = expenseEntity;
    this.getCourses();
    this.joinExpenseWithForm();
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

  joinExpenseWithForm(): void {
    this.expenseForm.get('courseId')?.setValue(this.expense.course?.id);
    this.expenseForm.get('cost')?.setValue(this.expense.cost);
    this.expenseForm.get('description')?.setValue(this.expense.description);
    this.expenseForm.get('emission')?.setValue(moment(this.expense.emission).toDate());
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    if (this.expenseForm.valid) {
      this.anyfildEmpty = false;
      this.joinFormWithExpense();
      this.expenseService.update(this.expense).subscribe({
        next: res => {
          this.toast.success('Despesa Atualizada')
          this.dialogRef.close(true);
        },
        error: error => {
          this.toast.error('Ops.. Tivemos algum problema');
          this.dialogRef.close(false);
        }
      });
    }else {
      this.anyfildEmpty = true;
    }
  }
}
