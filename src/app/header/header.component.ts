import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthServiceService } from "../auth/auth-service.service";
import { Subscription } from "rxjs";


@Component({
    selector:'app-header',
templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    
isAuthenticated = false;
private userSub: Subscription;

  constructor( private dataService : DataStorageService, private authservice: AuthServiceService){}

    ngOnInit(): void {
       this.userSub =  this.authservice.user.subscribe(user => {
        this.isAuthenticated = !user ? false : true;//!!user
       });
    }

    onSaveData(){
        this.dataService.storeRecipes();
    }

    onFetchData(){
        this.dataService.fetchRecipes().subscribe();
    }

    onlogout(){
        this.authservice.logout();
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}