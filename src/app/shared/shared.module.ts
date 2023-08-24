import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PtBrMatPaginatorIntl } from './app-material/PtBrMatPaginatorIntl';
import { MatPaginatorIntl } from '@angular/material/paginator';



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
  ],
  // Traduzindo o Paginator
  providers: [{provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl}]
})
export class SharedModule { }
