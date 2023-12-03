import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Expense } from 'src/app/models/expense';
import { AllCoursesService } from 'src/app/services/all-courses.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { AddExpenseDialogComponent } from '../dialogs/add-expense-dialog/add-expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UpdateExpenseDialogComponent } from '../dialogs/update-expense-dialog/add-expense-dialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {

  moment: any = require('moment');

  dateStart: any = this.getDateTodayMinusOneMonth();
  dateEnd: Date = new Date();
  selectedCourse: number = 0;
  courses: Course[] = [];

  expenses: Expense[] = [];
  displayedColumns: string[] = ['emission', 'description', 'cost', 'buttons'];

  constructor(
    private service: ExpenseService,
    private courseService: AllCoursesService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {
    this.service.findBySearch().subscribe({
      next: res => this.expenses = res,
      error: error => console.log(error),
      complete: () => this.findCourses()
    });
  }

  private findCourses(): void {
    this.courseService.getCourses().subscribe({
      next: res => this.courses = res,
      error: error => console.log(error)
    });
  }

  public search(): void {
    if(this.isDateEndMoreThanDateStart()) {
      const start = this.formatDateYYYYMMDD(this.dateStart);
      const end = this.formatDateYYYYMMDD(this.dateEnd);
      this.service.findBySearch(start, end, this.selectedCourse)
      .subscribe({
        next: res => this.expenses = res,
        error: error => console.log(error)
      });
    }
  }

  isDateEndMoreThanDateStart(): boolean {
    return this.dateEnd.getTime() > this.dateStart.getTime();
  }

  private formatDateYYYYMMDD(data: Date) {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const day = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    return `${year}-${month}-${day}`;
  }

  private getDateTodayMinusOneMonth(): any {
    const monthBack = this.moment().subtract(1, 'months').format('YYYY-MM-DD') + 'T12:00:00Z';
    return new Date(monthBack);
  }

  addExpense(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {data: this.selectedCourse});
    dialogRef.afterClosed().subscribe({
      next: result => { if (result) this.search() }
    });
  }

  private deleteExpense(id: number): void {
    this.service.delete(id).subscribe({
      next: res => {
        this.search();
        this.toast.info('Despesa Deletada');
      },
      error: error => {
        this.toast.error('Ops.. Tivemos algum problema');
        console.log(error);
      }
    });
  }

  showConfirmationDelete(id: number, description: string): void {
    const txtConfirmation =`Descrição da despesa: (${description}). \n Essa ação não poderá ser desfeita. Deseja realmente excluír essa despesa?`;
    const dialogConfirmation = this.dialog.open(ConfirmDialogComponent, {data: txtConfirmation});
    dialogConfirmation.afterClosed().subscribe({
      next: result => { if (result) this.deleteExpense(id); }
    });
  }

  update(expenseUpdate: Expense): void {
    this.dialog.open(UpdateExpenseDialogComponent, {data: expenseUpdate});
  }

}
