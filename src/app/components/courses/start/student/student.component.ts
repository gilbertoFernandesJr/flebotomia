import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  student: Student = {
    name: '',
    cpf: ''
  }

  public studentForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    dateBirth: ['', [Validators.required]],
    observation: ['', [Validators.maxLength(200)]],
  });

  studentUpdateHasError: boolean = false;

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastrService,
    public dialog: MatDialog,
  ) {

    this.route.params.subscribe(params => this.student.id = params['id']);
    this.findStudent();

    // Max year old of 60 years and minumum of 16 years old
    // Used at date birth of student
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
  }

  findStudent(): void {
    this.service.findById(this.student.id).subscribe({
      next: res => this.student = res,
      error: error => console.log(error),
      complete: () => this.joinStudentWithForm()
    });
  }

  joinStudentWithForm(): void {
    this.studentForm.get('name')?.setValue(this.student.name);
    this.studentForm.get('cpf')?.setValue(this.student.cpf);
    this.studentForm.get('phone')?.setValue(this.student.phone);
    this.studentForm.get('observation')?.setValue(this.student.observation);
    this.studentForm.get('dateBirth')?.setValue(moment(`${this.student.dateBirth}`).toDate()) //Adjust UTC);
  }

  joinFormWithStudent(): void {
    this.student.name = this.studentForm.get('name')?.value;
    this.student.cpf = this.studentForm.get('cpf')?.value;
    this.student.phone = this.studentForm.get('phone')?.value;
    this.student.observation = this.studentForm.get('observation')?.value;
    this.student.dateBirth = this.studentForm.get('dateBirth')?.value;
  }

  updateStudent(): void {
    if(this.studentForm.valid) {
      this.joinFormWithStudent();

      this.service.update(this.student).subscribe({
        next: res => {
          this.student = res;
          this.studentUpdateHasError = false;
          this.toast.success('Aluno atualizado');
        },
        error: error => {
          console.log(error);
          if (error.error.message == 'CPF already in use') {
            this.toast.error('CPF já em uso por outro aluno');
          } else {
            this.toast.error('Ops.. Tivemos um erro, tente novamente mais tarde');
          }
        }
      });
    } else {
      this.studentUpdateHasError = true;
    }
  }

  deleteStudent(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Tem certeza que deseja excluír defenitivamente esse aluno?'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.route.params.subscribe(() => {
          this.service.delete(this.student.id).subscribe({
            next: () => {
              this.toast.info('Aluno removido');
              this.back();
            },
            error: error => {
              let e = error.error.message.substring(0, 25);
              if (e == 'Student with relationship') {
                let team = error.error.message.substring(29);
                this.toast.error(`Aluno matriculado na turma ${team}, será necessário remove-lo primeiro.`);
              } else {
                this.toast.error('Ops! tivemos alguns erro.');
              }
              console.log(error);
            }
          });
        });
      }
    });
  }

  back(): void {
    history.back();
  }

}
