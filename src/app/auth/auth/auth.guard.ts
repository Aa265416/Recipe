import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from "rxjs";
import { AuthServiceService } from "../auth-service.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

constructor(private authservice: AuthServiceService, private router:Router){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree > | Promise<boolean | UrlTree> | boolean | UrlTree  {
   return this.authservice.user.pipe(take(1),map(user =>{
    const isAuth = !!user;//converts anything truish like object or not null to true and converts any thing falish like null or undefined to false.
   if(isAuth){
    return true;
   }
   return this.router.createUrlTree(['/auth'])
}),
//older version  
// tap(isAuth =>{
//     if(!isAuth){
//         this.router.navigate(['/auth'])
//     }
// })

);
}

}