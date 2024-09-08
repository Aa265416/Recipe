import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from '../shopping-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule, FormsModule,ShoppingRoutingModule, SharedModule
  ]
})
export class ShoppingModule { }
