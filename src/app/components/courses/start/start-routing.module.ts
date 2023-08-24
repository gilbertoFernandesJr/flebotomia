import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path: '', component: StartComponent,
    children: [
      { path: 'all', component: AllCoursesComponent, title: 'Cursos' },
      { path: 'teams/:name/:id', component: TeamsComponent, title: 'Turmas' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
