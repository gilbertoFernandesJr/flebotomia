import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';

const routes: Routes = [
  {
    path: '', component: StartComponent,
    children: [
      { path: 'all', component: AllCoursesComponent, title: 'Cursos' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
