import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { FlebotomiaComponent } from './flebotomia/flebotomia.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';


@NgModule({
  declarations: [
    CoursesComponent,
    FlebotomiaComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule
  ]
})
export class CoursesModule { }
