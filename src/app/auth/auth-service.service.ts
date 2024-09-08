import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './auth/user.modal';
import { Router } from '@angular/router';


export interface AuthResponse {
idToken	:string,	
email :	string,	
refreshToken	:string,	
expiresIn	:string,	
localId: string,
registered?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
user = new BehaviorSubject<User>(null);
private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router:Router) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEIMnUF6Ii82puRIcwWPTU5J5g0ofqwSA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError), tap(resData =>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEIMnUF6Ii82puRIcwWPTU5J5g0ofqwSA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData =>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  autoLogin(){
    const userData: {
      email:string,
      id:string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadeduser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadeduser.token){
      this.user.next(loadeduser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()

      this.autologout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autologout(expirationDuration: number){
    console.log(expirationDuration)
this.tokenExpirationTimer = setTimeout(() => {
  
  this.logout();
}, expirationDuration);
  }

  private handleAuthentication(email:string, userId: string, token:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email, 
      userId, 
      token, 
      expirationDate
    )
    this.user.next(user);
    this.autologout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error is occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(() => new Error(errorMessage));
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXITS':
      errorMessage = 'This email exits already';
      break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

}
