import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { FlebotomiaComponent } from './flebotomia/flebotomia.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { DegreeComponent } from './degree/degree.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

// Get token and add all requests of the front to back
// AuthService save the token no localStorage
export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    CoursesComponent,
    FlebotomiaComponent,
    DegreeComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080", "ceslab-back-production.up.railway.app"]
        // For default insert on the header the authorization by token
      }
    })
  ]
})
export class CoursesModule {}
