import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipe-added',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css']
})
export class RecipeAddedComponent implements OnInit{
id:number;
editMode = false;
recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService, 
              private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((parmas: Params)=>{
      this.id = +parmas['id'];
      this.editMode = parmas['id'] != null;
      this.initForm();
      console.log(this.editMode)
    })
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, Validators.required)
      })
    )
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }
  private initForm(){
    let recipeName = '';
    let recipeImagepath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipes(this.id);
      recipeName= recipe.name;
      recipeImagepath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for( let ingredient of recipe.ingredients){
          recipeIngredients.push( new FormGroup({
            'name' : new FormControl(ingredient.name,Validators.required),  
            'amount' : new FormControl(ingredient.amount, [Validators.required])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
        'name' : new FormControl(recipeName, Validators.required),
        'imagePath' : new FormControl(recipeImagepath,Validators.required),
        'description' : new FormControl(recipeDescription,Validators.required),
        'ingredients': recipeIngredients
      });
  }

}
