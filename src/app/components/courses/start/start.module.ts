import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';



@NgModule({
  declarations: [
    StartComponent,
    AllCoursesComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    AppMaterialModule
  ]
})
export class StartModule { }
