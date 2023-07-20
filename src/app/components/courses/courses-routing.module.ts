import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlebotomiaComponent } from './flebotomia/flebotomia.component';
import { DegreeComponent } from './degree/degree.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auth', component: AuthComponent},
      {path: 'flebotomia', component: FlebotomiaComponent},
      {path: 'degree/:code', component: DegreeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
