import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { ErroComponent } from './components/erro/erro.component';

//Componets Material
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
