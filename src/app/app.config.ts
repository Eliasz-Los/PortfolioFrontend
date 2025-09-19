import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors,} from '@angular/common/http';
import {environment} from '../env/environment';
import { HttpInterceptorFn } from '@angular/common/http';


const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.urlPattern.test(req.url)) {
    // Custom logic for matching URLs
    // e.g., add headers, log, etc.
  }
  return next(req);
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([urlInterceptor]))
  ]
};
