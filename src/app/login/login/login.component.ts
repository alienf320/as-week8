import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  form!: FormGroup;  
  subs!: Subscription;
  spinner = false;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private snackbar: MatSnackBar) { 
    this.form = fb.group({
      email: ['', Validators.required ],
      password: ['', [Validators.required ]]
    })
  }  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }

  logIn() {
    this.spinner = true;
    this.subs = this.authService.logIn(this.email!.value, this.password!.value)
      .subscribe( 
        response => {
          if(response.hasOwnProperty('accessToken')) {
            this.authService.loggedIn.next(true);
            localStorage.setItem('token', response.accessToken) 
            localStorage.setItem('tokenRefresh', response.refreshToken)
            this.route.navigate(['/home'])
          }
      }, err => {
        this.spinner = false
        this.openSnackBar();
      }, () => this.spinner = false )
  }

  openSnackBar() {
    this.snackbar.open('Email or password are incorrect', '', { duration: 2000});
  }  
}
