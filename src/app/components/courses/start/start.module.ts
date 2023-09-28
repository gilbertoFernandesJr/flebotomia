import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TeamsComponent } from './teams/teams.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StartComponent,
    AllCoursesComponent,
    TeamsComponent,
    StudentsComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    AppMaterialModule,
    SharedModule,
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StartModule { }
