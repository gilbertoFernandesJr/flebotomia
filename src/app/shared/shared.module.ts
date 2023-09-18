import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PtBrMatPaginatorIntl } from './app-material/PtBrMatPaginatorIntl';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PhonePipe } from './pipes/phone.pipe';
import { DateDescribePipe } from './pipes/date-describe.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CapitalizePipe,
    PhonePipe,
    DateDescribePipe
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
    CapitalizePipe,
    PhonePipe,
    DateDescribePipe
  ],
  // Traduzindo o Paginator
  providers: [
    {provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl},
    DatePipe
  ]
})
export class SharedModule { }
