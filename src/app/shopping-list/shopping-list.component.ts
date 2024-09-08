import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from '../services/shopping-List.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingredients: Ingredient[] = [];
 private idChangeSub: Subscription;
 constructor(private shoppingService : shoppingListService){}
 
  ngOnInit(): void {
   this.ingredients = this.shoppingService.getIngredints();
   this.idChangeSub = this.shoppingService.ingredientChanged.subscribe((ingredient : Ingredient[])=>{
    this.ingredients = ingredient;
   })
  }
ngOnDestroy(): void {
  this.idChangeSub.unsubscribe();
}
onEditItem(index: number){
this.shoppingService.startedEditing.next(index);
}
}
