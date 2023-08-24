import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CapitalizePipe
  ]
})
export class SharedModule { }
