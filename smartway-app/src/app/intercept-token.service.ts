import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {
  [x: string]: any;

  constructor(private a: AuthService, private router: Router) { }

private handleAuthError() {
  this.router.navigateByUrl('login');
}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.a.getToken()}`
      }
    });
    return next.handle(request).pipe(
      catchError(
        (err,caught)=>{
          if(err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          return throwError(err);
        }
      )
    )
  }
}
