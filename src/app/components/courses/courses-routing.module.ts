import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlebotomiaComponent } from './flebotomia/flebotomia.component';
import { DegreeComponent } from './degree/degree.component';
import { AuthComponent } from './auth/auth.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    children: [
      {path: 'auth', component: AuthComponent},
      {path: 'flebotomia', component: FlebotomiaComponent},
      {path: 'degree/:code', component: DegreeComponent},
      {path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
