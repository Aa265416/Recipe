import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../recipe.model";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { RecipeService } from "src/app/services/recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipe();

        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else
        return recipes;
    }
}