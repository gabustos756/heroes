import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

let totalRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);
  
  totalRequests++;
  loadingService.setLoading(true);

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Success response
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Error response
      return throwError(() => error);
    }),
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        loadingService.setLoading(false);
      }
    })
  );
}; 