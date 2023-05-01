import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = 'An unknown error occurred';
        switch (error.status) {
          case 409:
            errorMessage = error.error.message;
            break;
          case 404:
            errorMessage = 'Page not found';
            break;
          default:
            break;
        }
        this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          }
        );
        return throwError(() => error);
      })
    );
  }
}
