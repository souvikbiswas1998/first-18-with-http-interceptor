import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { finalize, Observable, retry } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
// import { ApiService } from './service/api.service';

// @Injectable()
// export class MyHttpInterceptor implements HttpInterceptor {
//   constructor(private router: Router) // private service: ApiService
//   { }

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     // this.service.loader.next(true);
//     let access_token = localStorage.getItem('accessToken');
//     console.log(access_token);
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${access_token}`,
//         // "Access-Control-Expose-Headers": "*",
//         // "Access-Control-Allow-Headers": "*"
//       },
//     });
//     return next.handle(request).pipe(
//       // finalize(() => this.service.loader.next(false)),
//       tap({
//         next: (httpEvent) => {
//           // console.log(httpEvent);
//           if (httpEvent instanceof HttpResponse) {
//             // console.log(httpEvent.headers.keys())
//             // console.log(httpEvent.headers.getAll('host-header'), 'host header');
//             // console.log(httpEvent.headers.has('token'), 'token');
//             // console.log(httpEvent.headers.keys(),'responses');
//           }
//         },
//         error: (err: any) => {
//           // console.log(err,'intercept');

//           if (err instanceof HttpErrorResponse) {
//             switch (err.status) {
//               case 401:
//                 localStorage.setItem(
//                   'temp_url',
//                   localStorage.getItem('url') || '/'
//                 );
//                 localStorage.removeItem('token');
//                 this.router.navigate(['/login']);
//                 break;
//               case 402:
//                 localStorage.setItem(
//                   'temp_url',
//                   localStorage.getItem('url') || '/'
//                 );
//                 localStorage.removeItem('token');
//                 this.router.navigate(['/login']);
//                 break;
//               case 403:
//                 localStorage.setItem(
//                   'temp_url',
//                   localStorage.getItem('url') || '/'
//                 );
//                 localStorage.removeItem('token');
//                 this.router.navigate(['/login']);
//                 break;
//               // case 500:
//               // localStorage.setItem('temp_url', localStorage.getItem('url') || '/')
//               // localStorage.removeItem('token');
//               // this.router.navigate(['/login']);
//               // break;
//               default:
//                 // this.router.navigate(['info/error']);
//                 return;
//             }
//           }
//           return err;
//         },
//       })
//     );
//   }
// }



export const MyHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let access_token = localStorage.getItem('accessToken');
  let cloned;
  if (access_token) {
    cloned = req.clone({
      setHeaders: {
        authorization: access_token,
      },
    });
  } else {
    cloned = req;
  }
  return next(cloned).pipe(
    retry(2),
    // finalize(() => this.service.loader.next(false)),
    tap({
      next: (httpEvent) => {
        // console.log(httpEvent);
        if (httpEvent instanceof HttpResponse) {
          // console.log(httpEvent.headers.keys())
          // console.log(httpEvent.headers.getAll('host-header'), 'host header');
          // console.log(httpEvent.headers.has('token'), 'token');
          // console.log(httpEvent.headers.keys(),'responses');
        }
      },
      error: (err: any) => {
        // console.log(err,'intercept');

        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:

              break;
            case 402:

              break;
            case 403:

              break;
            // case 500:
            // localStorage.setItem('temp_url', localStorage.getItem('url') || '/')
            // localStorage.removeItem('token');
            // this.router.navigate(['/login']);
            // break;
            default:
              // this.router.navigate(['info/error']);
              return;
          }
        }
        return err;
      },
    })
  );
}
