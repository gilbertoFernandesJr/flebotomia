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
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CapitalizePipe,
    PhonePipe,
    DateDescribePipe,
    ConfirmDialogComponent,
    CpfCnpjPipe
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    }),
    AppMaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CapitalizePipe,
    PhonePipe,
    DateDescribePipe,
    CpfCnpjPipe
  ],
  // Traduzindo o Paginator
  providers: [
    {provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl},
    DatePipe
  ]
})
export class SharedModule { }
