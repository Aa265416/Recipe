import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ThisReceiver } from "@angular/compiler";

export class shoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>;
   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 15)
       ];
   
    getIngredints(){
        return this.ingredients.slice();
    }   
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
    }
    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    delteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}