import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AppHTTPInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
  ) {}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = localStorage.getItem('token');
   console.log("token: ", token);
   if (!!token) {
     request = request.clone({
       setHeaders: {
         'x-access-token': token,
       }
     });
   }
   return next.handle(request).pipe(
     tap(
       event => {

       },
       (error: HttpErrorResponse) => {
         console.log("login error: ", error);
         if (error.status === 401) {
          localStorage.removeItem('token');
          this._router.navigate(['/login']);
         }
       },
     )
   );
 }

}