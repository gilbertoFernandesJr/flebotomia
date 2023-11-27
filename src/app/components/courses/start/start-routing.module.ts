import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TeamsComponent } from './teams/teams.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { AnalyticalComponent } from './analytical/analytical.component';

const routes: Routes = [
  {
    path: '', component: StartComponent,
    children: [
      {
        path: 'all',
        component: AllCoursesComponent, title: 'Cursos'
      },
      {
        path: 'teams/:id',
        component: TeamComponent, title: 'Turma'
      },
      {
        path: 'teams/:name/:id',
        component: TeamsComponent, title: 'Turmas'
      },
      {
        path: 'students/:nameTeam/:idTeam',
        component: StudentsComponent, title: 'Alunos'
      },
      {
        path: 'students/:nameTeam/:idTeam/:idStudent',
        component: StudentComponent, title: 'Aluno'
      },
      {
        path: 'settings',
        component: UserComponent, title: 'Usuário'
      },
      {
        path: 'analytical',
        component: AnalyticalComponent, title: 'Análise Financeira'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
