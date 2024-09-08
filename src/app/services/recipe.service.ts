import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipe/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingListService } from "./shopping-List.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>;
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     [ new Ingredient('Buns', 1),
    //       new Ingredient('French Fries', 25)]),
    //     new Recipe('Another Test recipe',
    //     'This is another test recipe',
    //     'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',[ new Ingredient('Aloo paranthe', 5), new Ingredient('Paneer Paranthe', 8)])
    // ];
    private recipes: Recipe[] = [];

constructor(private shoppingService: shoppingListService){}

    addIngredientToShoppingList(ingredients : Ingredient[]){
        this.shoppingService.addIngredients(ingredients)
    }
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
    }
    getRecipe() {
        return this.recipes.slice();
    }
    getRecipes(index: number){
        return this.recipes[index];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
    }
    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice())
    }
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice())
    }
}