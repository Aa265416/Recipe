import { NgModule } from '@angular/core';
import { RecipeAddedComponent } from '../recipe-added/recipe-added.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeComponent } from '../recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from '../recipe-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeAddedComponent,
  ],
  exports: [],
  imports: [
   CommonModule, SharedModule, RouterModule, FormsModule, ReactiveFormsModule,RecipeRoutingModule
  ]
})
export class RecipeModule { }
