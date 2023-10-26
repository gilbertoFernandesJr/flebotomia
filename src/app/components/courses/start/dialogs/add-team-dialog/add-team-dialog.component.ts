import { TeamCreate } from './../../../../../models/team/team-create';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-student-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent {

  teamCreate: TeamCreate = {
    name: '',
    startDate: new Date,
    priceRegistration: 0,
    firstMonthPayment: new Date,
    priceMonthPayments: 0,
    quantityMonths: 0,
    courseDTO: {id: 0}
  }

  public teamForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    dateStart: ['', [Validators.required]],
    priceReg: ['', [Validators.required]],
    priceMon: ['', [Validators.required]],
    firstMonth: ['', [Validators.required]],
    quantityMon: ['', [Validators.required]]
  });

  hasError: boolean = false;
  showNameTeam: boolean = true;

  constructor(
    private service: TeamService,
    private toast: ToastrService,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public courseId: number
  ) {}

  joinFormWithTeam(): void {
    this.teamCreate.name = this.teamForm.get('name')?.value;
    this.teamCreate.startDate = this.teamForm.get('dateStart')?.value;
    this.teamCreate.priceRegistration = this.teamForm.get('priceReg')?.value;
    this.teamCreate.firstMonthPayment = this.teamForm.get('firstMonth')?.value;
    this.teamCreate.priceMonthPayments = this.teamForm.get('priceMon')?.value;
    this.teamCreate.quantityMonths = this.teamForm.get('quantityMon')?.value;
    this.teamCreate.courseDTO.id = this.courseId;
  }

  validateName(): void {
    if (this.teamForm.get('name')?.valid) {
      const name: string = this.teamForm.get('name')?.value;
      this.service.findByName(name).subscribe({
        next: res => {
          try {
            if (res.id) this.toast.error('Nome da turma já existe');
          }catch {
            this.joinFormWithTeam();
            this.showNameTeam = false;
          }
        },
        error: error => console.log(error)
      });
    }
  }

  save(): void {
    if(this.teamForm.valid) {
      this.joinFormWithTeam();
      console.log(JSON.stringify(this.teamCreate));
      this.hasError = false;
      this.service.createTeam(this.teamCreate).subscribe({
        next: res => this.dialogRef.close(res),
        error: error => this.toast.error('Ops.. tivemos um erro inesperado')
      });
    }else {
      this.hasError = true;
    }
  }

  backChoseName(): void {
    this.showNameTeam = true;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
