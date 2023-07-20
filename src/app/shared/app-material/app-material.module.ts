import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  exports: [
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
