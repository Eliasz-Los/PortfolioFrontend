import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpEvent, provideHttpClient, withInterceptors,} from '@angular/common/http';
import {environment} from '../env/environment';
import { HttpInterceptorFn } from '@angular/common/http';
import {keycloakAuth} from './core/services/auth/KeycloakAuthService';
import {from, Observable, switchMap} from 'rxjs';

function initKeycloak() {
  return () => keycloakAuth.init()
    .catch((error) => {
      console.error('Keycloak initialization failed', error);
    });
}

const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.urlPattern.test(req.url)) {}
  return next(req);
};

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isApi = environment.urlPattern.test(req.url);
  return from(isApi ? keycloakAuth.getAccessToken() : Promise.resolve(null)).pipe(
    switchMap(token => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    }));
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
