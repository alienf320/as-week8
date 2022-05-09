import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable, switchMap } from 'rxjs';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('token')
    const req = request.clone( {
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(req).pipe( catchError( (err: HttpErrorResponse) => {
        if(err.status === 401) {
          return this.http.post('http://sheltered-oasis-97086.herokuapp.com/auth/refresh', {}, {withCredentials: true}).pipe(
            switchMap( (res:any) => {
              localStorage.setItem('token', res.accessToken);
              return next.handle(request.clone( {
                setHeaders: {
                  Authorization: `Bearer ${res.token}`
                }
              }))
            })
          )
        } else {
          return next.handle(req)
        }
      }));
  }
}
