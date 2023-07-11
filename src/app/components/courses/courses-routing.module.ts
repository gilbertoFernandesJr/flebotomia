import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlebotomiaComponent } from './flebotomia/flebotomia.component';
import { DegreeComponent } from './degree/degree.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
