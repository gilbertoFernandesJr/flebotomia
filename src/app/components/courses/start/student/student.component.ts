import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MonthPayment } from 'src/app/models/month_payment';
import { Registration } from 'src/app/models/registration';

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
    nome: ['', [Validators.required, Validators.email]],
    cpf: ['', Validators.required],
    phone: ['', Validators.required],
    bithDay: ['', Validators.required]
  });

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private formBuilder: UntypedFormBuilder
  ){

    this.route.params.subscribe(params => this.getStudent(params["idStudent"]));

    // Set the minimum to January 1st 60 years in the past and December 31st 16 years int the past
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
  }

  getStudent(id: number): void {
    this.service.findById(id).subscribe({
      next: res => this.student = res,
      error: error => console.log(error),
      complete: () => this.numbersReatives()
    });
  }

  numbersReatives(): void {
    //Calc debit of registration
    this.student.registrations?.forEach(r => {
      this.registrationReative.price = r.price;
      this.registrationReative.discount = r.discount
      this.registrationReative.received = r.received;
    });
    this.calcDebitMat();

    //Calc debit of monthpayments
    this.monthPaymentsReative = this.student.monthPayments!;
    let i = 0;
    this.student.monthPayments?.forEach(m => {
      this.calcDebitMonthPayment(i);
      i++;
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

  updateStudent(): void {}

  back(): void {
    history.back();
  }
}
