import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MonthPayment } from 'src/app/models/month_payment';
import { Registration } from 'src/app/models/registration';
import { RegistrationService } from 'src/app/services/registration.service';
import { RegistrationUpdate } from 'src/app/dto/registration-update';
import { MonthPaymentUpdate } from 'src/app/dto/month-payment-update';
import { MonthPaymentSerive } from 'src/app/services/month-payment.service';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';

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

  monthPaymentsReative: MonthPayment[] = [];
  selectedMonthPayment: number = 0;
  registrationReative: Registration =
    {id: 0, paid: false, team: {id: 0, name: '', completed: false}};

  public studentForm: UntypedFormGroup = this.formBuilder.group({
    name: [this.student.name, [Validators.required]],
    cpf: [this.student.cpf, [Validators.required]],
    phone: [this.student.phone, [Validators.required]],
    dateBirth: [this.student.dateBirth, [Validators.required]]
  });

  studentUpdateHasError: boolean = false;

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private formBuilder: UntypedFormBuilder,
    private registrationSerive: RegistrationService,
    private monthPaymentSerive: MonthPaymentSerive,
    private toastr: ToastrService
  ){

    this.route.params.subscribe(params => this.getStudent(params["idStudent"]));

    // Max year old of 60 years and minumum of 16 years old
    // Used at date birth of student
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
  }

  getStudent(id: number): void {
    this.service.findById(id).subscribe({
      next: res => this.student = res,
      error: error => console.log(error),
      complete: () => this.startComponent()
    });
  }

  startComponent(): void {
    //Calc debit of registration
    this.student.registrations?.forEach(r => {
      this.registrationReative = r;
    });
    this.calcDebitMat();

    //Calc debit of monthpayments
    this.monthPaymentsReative = this.student.monthPayments!;
    let i = 0;
    this.student.monthPayments?.forEach(m => {
      this.calcDebitMonthPayment(i);
      i++;
    });

    // Attach student with the student form
    this.attachStudentWithForm();

  }

  attachStudentWithForm(): void {
    this.studentForm.setValue({
      name: this.student.name,
      cpf: this.student.cpf,
      phone: this.student.phone,
      dateBirth: moment(`${this.student.dateBirth}`).toDate() //Adjust UTC
    });
  }

  calcDebitMat(): void {
    this.registrationReative.debit =
      this.registrationReative.price! - this.registrationReative.discount!
       - this.registrationReative.received!;
  }

  calcDebitMonthPayment(i: number): void {
    this.monthPaymentsReative[i].debit =
    this.monthPaymentsReative[i].price! - this.monthPaymentsReative[i].discount! -
    this.monthPaymentsReative[i].received!;
  }

  updateStudent(): void {

    if(this.studentForm.valid) {
      this.student.name = this.studentForm.get(['name'])?.value;
      this.student.cpf = this.studentForm.get(['cpf'])?.value;
      this.student.phone = this.studentForm.get(['phone'])?.value;
      this.student.dateBirth = this.studentForm.get(['dateBirth'])?.value;

      this.service.update(this.student).subscribe({
        next: res => {
          this.student = res;
          this.studentUpdateHasError = false;
          this.toastr.success('Estudante atualizado');
        },
        error: error => {
          console.log(error);
          if (error.error.message == 'CPF already in use') {
            this.toastr.error('CPF já em uso por outro aluno');
          } else {
            this.toastr.error('Ops.. Tivemos um erro, tente novamente mais tarde');
          }
        }
      });
    } else {
      this.studentUpdateHasError = true;
    }
  }

  updateRegistration(): void {
    const registrationDto: RegistrationUpdate = {
      id: this.registrationReative.id,
      price: this.registrationReative.price,
      received: this.registrationReative.received,
      payday: this.registrationReative.payday,
      discount: this.registrationReative.discount,
      paid: this.registrationReative.paid
    }
    this.registrationSerive.update(registrationDto).subscribe({
      next: (res) => alert('Matrícula atualizada'),
      error: (error) => console.log(error)
    });
  }

  updateMonthPayment(): void {
    var monthPayment = this.monthPaymentsReative[this.selectedMonthPayment];

    const monthPaymentDto: MonthPaymentUpdate = {
      id: monthPayment.id,
      price: monthPayment.price,
      received: monthPayment.received,
      payday: monthPayment.payday,
      discount: monthPayment.discount,
      paid: monthPayment.paid
    }

    this.monthPaymentSerive.update(monthPaymentDto).subscribe({
      next: res => alert("Matrícula atualizada com sucesso!"),
      error: error => console.log(error)
    });

  }

  back(): void {
    history.back();
  }
}
