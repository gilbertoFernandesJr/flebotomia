import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';


@NgModule({
  exports: [
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
