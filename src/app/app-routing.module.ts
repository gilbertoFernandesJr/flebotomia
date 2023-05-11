import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlebotomiaComponent } from './components/courses/flebotomia/flebotomia.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'flebotomia', component: FlebotomiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
