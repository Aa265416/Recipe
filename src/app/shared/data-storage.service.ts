import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient , private recipeService: RecipeService, private authservice: AuthServiceService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipe();
    this.http.put('https://recipe-book-f3d15-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes).subscribe(
      response => {
        console.log(response)
      })
  }
  fetchRecipes(){
  
      return this.http.get<Recipe[]>(
        'https://recipe-book-f3d15-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
    
      )
    .pipe(
    map(recipes => {
      return recipes.map(recipe =>{
        return{
          ...recipe, 
          ingredients : recipe.ingredients ? recipe.ingredients : []
        }
      })
    }),
      tap(recipes =>{
        this.recipeService.setRecipes(recipes);
          }
        ) 
    )

  }
}
