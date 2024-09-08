import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { DropdownDirective } from '../dropdown.directive';
import { LoaderComponent } from '../loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    AlertComponent,
    DropdownDirective,
  ]
})
export class SharedModule { }
