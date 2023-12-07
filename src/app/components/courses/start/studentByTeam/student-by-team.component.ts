import { DegreeService } from 'src/app/services/degree.service';
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
import { PaymentVoucherService } from '../../../../services/payment-voucher.service';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MonthPaymentService } from 'src/app/services/month-payment.service';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-student',
  templateUrl: './student-by-team.component.html',
  styleUrls: ['./student-by-team.component.scss']
})
export class StudentByTeamComponent {

  student: Student = {
    name: '',
    cpf: ''
  }

  team: Team = {id: 0, name:'', completed: false};

  degreeCode: string = '';
  degreeGenerationDate: any = null;
  studentWithDebit: boolean = false;

  monthPaymentsResume: {discount?: number, received?: number}[] = []
  monthPaymentsReative: MonthPayment[] = [];
  selectedMonthPayment: number = 0;
  registrationReative: Registration =
    {id: 0, paid: false, team: {id: 0, name: '', completed: false}};

  public studentForm: UntypedFormGroup = this.formBuilder.group({
    name: [this.student.name, [Validators.required]],
    cpf: [this.student.cpf, [Validators.required]],
    phone: [this.student.phone, [Validators.required]],
    dateBirth: [this.student.dateBirth, [Validators.required]],
    observation: [this.student.observation, [Validators.maxLength(200)]]
  });

  public registrationForm: UntypedFormGroup = this.formBuilder.group({
    discount: ['', [Validators.min(0), Validators.max(this.registrationReative.price!)]],
    received: ['', [Validators.min(0), Validators.max(this.registrationReative.price!)]],
    payday: [''],
  });

  studentUpdateHasError: boolean = false;
  voucherSending: boolean = false;

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private formBuilder: UntypedFormBuilder,
    private registrationService: RegistrationService,
    private monthPaymentService: MonthPaymentService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private paymentVoucherService: PaymentVoucherService,
    private degreeService: DegreeService
  ){

    this.route.params.subscribe(params => this.getStudent(params["idStudent"]));
    this.route.params.subscribe(params => this.team.name = params['nameTeam']);
    this.route.params.subscribe(params => this.team.id = params['idTeam']);

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
    // Attach Registration with the registration form
    this.attachRegistrationWithForm();
    this.addValidatorsRegistration();
    this.calcDebitMat();


    //Calc debit of monthpayments
    this.monthPaymentsReative = this.student.monthPayments!;
    let i = 0;
    this.monthPaymentsReative?.forEach(m => {
      this.calcDebitMonthPayment(i);
      m.payday = m.payday != null ? moment(m.payday).toDate() : null; //Adjust UTC
      i++;
      //Show in the month voucher
      this.monthPaymentsResume.push({discount: m.discount, received: m.received});
    });

    // Attach student with the student form
    this.attachStudentWithForm();

    //FindDegreeIfhave
    this.findDegree();

  }

  addValidatorsRegistration(): void {
    this.registrationForm.get('received')?.addValidators(Validators.max(this.registrationReative.price!));
    this.registrationForm.get('discount')?.addValidators(Validators.max(this.registrationReative.price!));
  }

  attachRegistrationWithForm(): void {
    this.registrationForm.setValue({
      discount: this.registrationReative.discount,
      received: this.registrationReative.received,
      payday: moment(`${this.registrationReative.payday}`).toDate() //Adjust UTC
    });
  }

  attachStudentWithForm(): void {
    this.studentForm.setValue({
      name: this.student.name,
      cpf: this.student.cpf,
      phone: this.student.phone,
      observation: this.student.observation,
      dateBirth: moment(`${this.student.dateBirth}`).toDate() //Adjust UTC
    });
  }

  calcDebitMat(): void {
    this.registrationReative.debit =
      this.registrationReative.price! - this.registrationForm.get(['discount'])?.value
       - this.registrationForm.get(['received'])?.value;
  }

  calcDebitMonthPayment(i: number): void {
    this.monthPaymentsReative[i].debit =
    this.monthPaymentsReative[i].price! - this.monthPaymentsReative[i].discount! -
    this.monthPaymentsReative[i].received!;
  }

  joinFormWithStudent(): void {
    this.student.name = this.studentForm.get(['name'])?.value;
    this.student.cpf = this.studentForm.get(['cpf'])?.value;
    this.student.phone = this.studentForm.get(['phone'])?.value;
    this.student.dateBirth = this.studentForm.get(['dateBirth'])?.value;
    this.student.observation = this.studentForm.get(['observation'])?.value;
  }

  updateStudent(): void {

    if(this.studentForm.valid) {
      
      this.joinFormWithStudent();

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
    if (this.registrationForm.valid && this.registrationReative.debit! >= 0) {
      let received = this.registrationForm.get(['received'])?.value
      let discount = this.registrationForm.get(['discount'])?.value
      const registrationDto: RegistrationUpdate = {
        id: this.registrationReative.id,
        price: this.registrationReative.price,
        received: received == '' ? 0 : received,
        discount: discount == '' ? 0 : discount,
        payday: this.registrationForm.get(['payday'])?.value,
        paid: this.registrationReative.paid
      }

      this.registrationService.update(registrationDto).subscribe({
        next: (res) => {
          this.toastr.success('Matrícula atualizada.');
          this.registrationReative.discount = res.discount;
          this.registrationReative.received = res.received;
        },
        error: (error) => {
          this.toastr.error('Ops! tivemos alguns erro.');
          console.log(error);
        }
      });
    } else {
      this.toastr.error('Campos inválidos.');
    }
  }

  updateMonthPayment(): void {
    var monthPayment = this.monthPaymentsReative[this.selectedMonthPayment];

    if(monthPayment.discount! > monthPayment.price || monthPayment.received! > monthPayment.price) {
      this.toastr.error('Campos inválidos.');

    } else {
      const monthPaymentDto: MonthPaymentUpdate = {
        id: monthPayment.id,
        price: monthPayment.price,
        received: monthPayment.received == '' ? 0 : monthPayment.received,
        discount: monthPayment.discount == '' ? 0 : monthPayment.discount,
        payday: monthPayment.payday,
        paid: monthPayment.paid
      }

      this.monthPaymentService.update(monthPaymentDto).subscribe({
        next: res => {
          this.toastr.success('Mensalidade atualizada');
          // Only show in viwer
          this.monthPaymentsResume[this.selectedMonthPayment].discount = res.discount;
          this.monthPaymentsResume[this.selectedMonthPayment].received = res.received;
        },
        error: error => {
          this.toastr.error('Ops! tivemos alguns erro.');
          console.log(error);
        }
      });
    }
  }

  public removeStudentOfTeam(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Essa ação excluirá  também matricula e mensalidades referentes a essa turma, não podendo ser desfeita. Tem certeza que deseja remover esse aluno?'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.route.params.subscribe(params => {
          this.service.removeStudentOfTeam(this.student.id, params["idTeam"]).subscribe({
            next: res => {
              this.toastr.info('Aluno removido');
              this.back();
            },
            error: error => {
              this.toastr.error('Ops! tivemos alguns erro.');
              console.log(error);
              this.back();
            }
          });
        });
      }
    });
  }

  sendPaymentVoucherRegistration(): void {
    this.voucherSending = true;
    this.paymentVoucherService.createForRegistration(this.registrationReative.id).subscribe({
      next: res => this.toastr.success('Comprovante enviado'),
      error: error => {
        this.toastr.error('Ops.. Tivemos algum erro');
        console.log(error);
      },
      complete: () => this.voucherSending = false
    });
  }

  sendPaymentVoucherMonthPayment(): void {
    this.voucherSending = true;
    var id = this.monthPaymentsReative[this.selectedMonthPayment].id;
    this.paymentVoucherService.createForMonthPayment(id).subscribe({
      next: res => this.toastr.success('Comprovante enviado'),
      error: error => {
        this.toastr.error('Ops.. Tivemos algum erro');
        console.log(error);
      },
      complete: () => this.voucherSending = false
    });
  }

  pdfPaymentVoucherRegistration(): void {
    this.voucherSending = true;
    this.paymentVoucherService.printPdfForRegistration(this.registrationReative.id).subscribe({
      next: res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: error => console.log(error),
      complete: () => this.voucherSending = false
    });
  }

  //Print pdf or dowload after open
  pdfPaymentVoucherMonthPayment(): void {
    this.voucherSending = true;
    var id = this.monthPaymentsReative[this.selectedMonthPayment].id;
    this.paymentVoucherService.printPdfForMonthPayment(id).subscribe({
      next: res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: error => console.log(error),
      complete: () => this.voucherSending = false
    });
  }

  //Not use, only example
  pdfPaymentVoucherMonthPaymentDownload(): void {
    this.voucherSending = true;
    var id = this.monthPaymentsReative[this.selectedMonthPayment].id;
    this.paymentVoucherService.printPdfForMonthPayment(id).subscribe({
      next: res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);

        //Download
        let a = document.createElement('a');
        a.download = 'comprovante-de-pagamento-ceslab';
        a.href = url;
        a.click();
      },
      error: error => console.log(error),
      complete: () => this.voucherSending = false
    });
  }

  findDegree(): void {
    this.degreeService.findByStudentAndTeam(this.student.id, this.team.id).subscribe({
      next: res => {
        if (res != null) {
          this.degreeCode = res.code;
          this.degreeGenerationDate = moment(res.generationDate).format('DD/MM/YYYY');
        }
      }
    });
  }

  createDegree(): void {
    if (!this.degreeCode) {
      this.degreeService.create({studentId: this.student.id, teamId: this.team.id}).subscribe({
        next: res => {
          this.degreeCode = res.code;
          this.degreeGenerationDate = moment(res.generationDate).format('DD/MM/YYYY');
          this.studentWithDebit = false;
        },
        error: error => {
          if (error.error.message == 'Student with debit') this.studentWithDebit = true;
          console.log(error);
        }
      });
    }
  }

  back(): void {
    history.back();
  }
}
