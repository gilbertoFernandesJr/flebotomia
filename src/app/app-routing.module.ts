import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErroComponent } from './components/erro/erro.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}, //Main router
  {
    //Lazy Loading, somente carrega os componetes do modulo ao ser requisitado
    path: 'courses', loadChildren: () => import('./components/courses/courses.module').then(m => m.CoursesModule)
  },
  {path: 'erro', component: ErroComponent},
  {path:'**', redirectTo: 'erro'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
