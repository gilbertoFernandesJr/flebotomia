import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TeamsComponent } from './teams/teams.component';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';



@NgModule({
  declarations: [
    StartComponent,
    AllCoursesComponent,
    TeamsComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    AppMaterialModule
  ]
})
export class StartModule { }
