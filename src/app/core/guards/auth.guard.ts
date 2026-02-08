import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {keycloakAuth} from '../services/auth/KeycloakAuthService';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (keycloakAuth.isAuthenticated()) return true;

 /* void keycloakAuth.login(window.location.origin + state.url)
    .catch(() => router.navigate(['/'])); // login failure => home redirection*/
  return false;
};
