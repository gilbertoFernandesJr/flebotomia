import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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

// config currency to R$
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

//Mask
import { NgxMaskModule } from 'ngx-mask';

// GMT-0234 (Horário Padrão de Brasília) -02:34 utc
registerLocaleData(ptBr);

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
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthInterceptorProvider,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
