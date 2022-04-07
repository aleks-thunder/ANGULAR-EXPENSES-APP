import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('access_token');

    if(idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', idToken)
      });
      return next.handle(cloned)
    } else {
      return next.handle(req);
    }
    // req = req.clone({
    //   url: req.url,
    //   setHeaders: this.auth.isAuthenticated() ? {
    //     Authorization: this.auth.loadToken()
    //   } : {}
    // });
    // return next.handle(req).pipe(
    //   catchError(err => {
    //     if (err.status === 401 || err.status === 403) {
    //       // localStorage.clear();
    //       // sessionStorage.clear();
    //     }
    //     return throwError(err);
    //   }
    //   )
    // );
  }

}
