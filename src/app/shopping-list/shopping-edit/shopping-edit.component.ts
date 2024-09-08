import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { shoppingListService } from 'src/app/services/shopping-List.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
@ViewChild("f") slForm: NgForm;
subscription : Subscription;
editMode = false;
editedItemIndex:number;
editedItem:Ingredient;

  // ingredientAdded = new EventEmitter<{name : string, amount: number}>();

  constructor(private shoppingService: shoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name : this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  onSubmit(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
   
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingService.delteIngredient(this.editedItemIndex);
    this.onClear();

  }
}
