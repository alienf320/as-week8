import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { JWT } from '../interfaces/JWT';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://sheltered-oasis-97086.herokuapp.com/auth'

  loggedIn = new BehaviorSubject(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor( private http: HttpClient ) { }

  logIn(email: string, password: string): Observable<JWT> {
    return this.http.post( this.url + '/login', {email, password}).pipe(
      map(data => (data as JWT),
      catchError( err => throwError(new Error('ocurrió un error')) )))
  }

  singUp(user: User) {
    return this.http.post( 'http://sheltered-oasis-97086.herokuapp.com/auth/signup', user )
  }

  refreshToken() {
    let refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken) {
      this.http.post( 'http://sheltered-oasis-97086.herokuapp.com/auth/refresh', {'refreshToken': refreshToken} ).pipe( map( data => {
        localStorage.setItem('token', JSON.stringify(data['accessToken' as keyof Object]));
        localStorage.setItem('refreshToken', JSON.stringify(data['refreshToken' as keyof Object]))
      }))
    }
  }
}
