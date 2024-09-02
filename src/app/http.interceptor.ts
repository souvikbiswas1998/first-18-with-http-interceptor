import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, delay, first, from, map, mergeMap, Observable, of, retry, retryWhen, switchMap, take, throwError } from 'rxjs';
import { CommonService } from './common.service';

export const MyHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let commonService: CommonService = inject(CommonService);
  let access_token = localStorage.getItem('accessToken');
  let cloned = req;
  if (access_token) {
    cloned = req.clone({
      setHeaders: {
        "Accept": "*/*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Headers": "*",
        authorization: `Bearer ${access_token}`,
      },
    });
  }
  return next(cloned).pipe(
    // retryWhen(errors =>
    //   errors.pipe(
    //     mergeMap((error, index) => {
    //       if (index < 2 && [401, 403].includes(error.status)) {
    //         return commonService.updateToken().pipe(
    //           delay(1000),
    //           map(() => {
    //             let access_token = localStorage.getItem('accessToken');
    //             const clonedRequest = req.clone({
    //               headers: req.headers.set('Authorization', `Bearer ${access_token}`)
    //             });
    //             return next(clonedRequest);
    //           })
    //         );
    //       }
    //       // return throwError(() => error);
    //       // if (error instanceof HttpErrorResponse) {
    //       //   // Retry up to 3 times with a delay of 1 second
    //       //   if (index < 2) {
    //       //     return of(error).pipe(delay(1000));
    //       //   }
    //       // }
    //       return throwError(error);
    //     }),
    //     take(2) // Limit the number of retries
    //   )
    // ),
    catchError((error: HttpErrorResponse) => {
      if ([401, 403].includes(error.status)) {
        return commonService.updateToken().pipe(
          switchMap(() => {
            let access_token = localStorage.getItem('accessToken');
            const clonedRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${access_token}`)
            });
            return next(clonedRequest);
          })
        );
      }
      return throwError(() => error);
    })
  )
}
