import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
isLogMode = true;
isLoading = false;
error = null;

constructor(private authservice: AuthServiceService, private router: Router){}

onSwitchMode(){
  this.isLogMode = !this.isLogMode;
}
onSubmit(form: NgForm){
  if(!form.valid){
    return;
  }
  const email = form.value.email;
  const password = form.value.password;
  let authObs : Observable<AuthResponse>

  this.isLoading = true;
  if(this.isLogMode){
    authObs = this.authservice.logIn(email, password);
  }
  else{
    authObs = this.authservice.signup(email, password);
  }

authObs.subscribe(
  resData => {
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(['/recipes'])
  }, 
  errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
}
)
  form.reset();
}

onHandleClose(){
  this.error = null;
}
}
