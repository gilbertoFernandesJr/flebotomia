import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  idTeam: number = 0;
  team: Team = {id:0, name:'', completed: false};
  nameTeamFixed: string = '';
  course: Course = {id: 0, name: ''};

  teamForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    completed: [''],
    endDate: ['']
  });

  constructor(
    private service: TeamService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.idTeam = params['id']);
    this.service.findById(this.idTeam).subscribe({
      next: res => {
        this.team = res;
        this.nameTeamFixed = this.team.name;
        this.course = res.courseDTO;
      },
      error: error => console.log(error),
      complete: () => this.joinTeamWithForm()
    })
  }

  joinTeamWithForm(): void {
    this.teamForm.get('name')?.setValue(this.team.name);
    this.teamForm.get('completed')?.setValue(this.team.completed);
    this.teamForm.get('endDate')?.setValue(moment(`${this.team.endDate}`).toDate()); //Adjust UTC
  }

  joinFormWithTeam(): void {
    this.team.name = this.teamForm.get('name')?.value;
    this.team.completed = this.teamForm.get('completed')?.value;
    this.team.endDate = this.teamForm.get('endDate')?.value;
  }

  update(): void {
    if (this.teamForm.valid) {
      this.joinFormWithTeam();
      this.service.update(this.team).subscribe({
        next: res => {
          this.toast.success('Turma atualizada');
          this.team = res;
        },
        error: error => {
          if (error.status == 400) this.toast.error('Nome já em uso por outra turma');
          else this.toast.error('Ops.. tivemos um erro, tente novamente mais tarde');
        }
      });
    }
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: "Essa ação excluirá  definitivamente os dados da turma; antes de excluir retire todos os alunos associados a ela, caso exista. Deseja excluir essa turma?"});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(this.team.id).subscribe({
          next: res => {
            this.toast.info(`Turma ${this.team.name} deletada com sucesso`);
            this.router.navigate([`/courses/start/teams/${this.course.name}/${this.course.id}`]);
          },
          error: e => {
            if (e.status == 400) this.toast.error("Turma contém estudantes");
            else this.toast.error('Ops.. tivemos um erro, tente novamente mais tarde');
          }
        });
      }
    });
  }

  back(): void {
    history.back();
  }

}
