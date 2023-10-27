import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  idTeam: number = 0;
  team: Team = {id:0, name:'', completed: false};
  nameTeamFixed: string = ''

  teamForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    completed: ['']
  });

  constructor(
    private service: TeamService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.idTeam = params['id']);
    this.service.findById(this.idTeam).subscribe({
      next: res => {
        this.team = res;
        this.nameTeamFixed = this.team.name;
      },
      error: error => console.log(error),
      complete: () => this.joinTeamWithForm()
    })
  }

  joinTeamWithForm(): void {
    this.teamForm.get('name')?.setValue(this.team.name);
    this.teamForm.get('completed')?.setValue(this.team.completed);
  }

  joinFormWithTeam(): void {
    this.team.name = this.teamForm.get('name')?.value;
    this.team.completed = this.teamForm.get('completed')?.value;
    console.log(`Nome da fixed ${this.team.name}`);
  }

  save(): void {
    if (this.teamForm.valid) {
      this.joinFormWithTeam();
      this.service.update(this.team).subscribe({
        next: res => {
          this.toast.success('Turma atualizada');
          this.team = res;
        },
        error: error => {
          if (error.status == 400) this.toast.error('Nome já em uso por outra turma')
          else console.log(error);
        }
      });
    }
  }

  back(): void {
    history.back();
  }

}
