import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { BasicHighlighDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { shoppingListService } from './services/shopping-List.service';
import { AppRoutingModule } from './app-routing.modules';
import { RecipeService } from './services/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { ShoppingModule } from './shopping-list/shopping/shopping.module';
import { SharedModule } from './shared/shared/shared.module';
import { AuthModule } from './auth/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServerElementComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    BasicHighlighDirective,
    BetterHighlightDirective,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    
  ],
  providers: [shoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
