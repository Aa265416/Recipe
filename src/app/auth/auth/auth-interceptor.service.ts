import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http"
import { exhaustMap, Observable, take } from "rxjs";
import { AuthServiceService } from "../auth-service.service";


 @Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authservice: AuthServiceService){}

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authservice.user.pipe(take(1), exhaustMap(user => {

            if(!user){
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params : new HttpParams().set('auth', user.token)
            })
            return next.handle(modifiedReq);
        }))
     }
   
}