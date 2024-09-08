import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

recipe : Recipe;
id:number;

constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {
  this.route.params.subscribe((parmas: Params) =>{
    this.id = +parmas['id'];
    this.recipe = this.recipeService.getRecipes(this.id);
  })
}

OnAddtoShoppingList(){
this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
}
onNewRecipe(){
  this.router.navigate(['edit'], {relativeTo:this.route});

  //alternate method
  // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
}
onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['/recipes'])
}
}
