import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth/auth.component";



const appRoutes: Routes = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'

    },
    {
        path:'recipes', loadChildren: ()=> import('./recipe/recipe/recipe.module').then(m => m.RecipeModule)
    },
    {
        path:'shopping-list', loadChildren:() => import('./shopping-list/shopping/shopping.module').then(m => m.ShoppingModule)
    },
    {
        path:'auth', loadChildren:() => import('./auth/auth/auth.module').then(m => m.AuthModule)
    }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule{

}