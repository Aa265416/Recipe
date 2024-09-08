import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth/auth.guard";
import { RecipeAddedComponent } from "./recipe-added/recipe-added.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeResolverService } from "./recipe-start/recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";

const routes : Routes = [
    {
        path: '', 
        component: RecipeComponent,
        canActivate:[AuthGuard], children:[
        {
            path: '', component: RecipeStartComponent
        },
        {
            path: 'new', component: RecipeAddedComponent
        },
        {
            path: ':id', 
            component: RecipeDetailsComponent, 
            resolve:[RecipeResolverService]
        },
        {
            path: ':id/edit',
            component: RecipeAddedComponent,
            resolve:[RecipeResolverService] 
         }
        ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RecipeRoutingModule{}