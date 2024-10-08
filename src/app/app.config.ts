import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { MyHttpInterceptor } from './http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  // { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  provideHttpClient(withInterceptorsFromDi(), withInterceptors([MyHttpInterceptor])), provideHttpClient()
  ]
  //need to know provideHttpClient(withInterceptorsFromDi())
};
