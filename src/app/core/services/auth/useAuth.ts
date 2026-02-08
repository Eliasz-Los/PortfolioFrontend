import { Injectable, inject } from '@angular/core';
import { KeycloakState } from './KeycloakState';
import { keycloakAuth } from './KeycloakAuthService';
import type { User } from '../../models/user/User';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class UseAuth {
  private readonly state = inject(KeycloakState);

  readonly ready = this.state.ready;
  readonly authenticated = this.state.authenticated;
  readonly user = this.state.user;
  readonly token = this.state.token;

  async init(): Promise<void> {
    try {
      await keycloakAuth.init();

      const token = await keycloakAuth.getAccessToken();
      const authenticated = keycloakAuth.isAuthenticated();

      this.state._setReady(true);
      this.state._setAuthenticated(authenticated);
      this.state._setToken(token);

      this.state._setUser(mapTokenToUser(keycloakAuth['kc'] as Keycloak));
    } catch (error) {
      console.error('Auth initialization failed', error);
      this.state._setReady(true);
      this.state._setAuthenticated(false);
      this.state._setToken(null);
      this.state._setUser(null);
    }
  }

  login(redirectUri: string = window.location.origin): Promise<void> {
    return keycloakAuth.login(redirectUri);
  }

  logout(redirectUri: string = window.location.origin): Promise<void> {
    return keycloakAuth.logout(redirectUri);
  }

  async refresh(): Promise<void> {
    const token = await keycloakAuth.getAccessToken();
    this.state._setToken(token);
  }

}

function mapTokenToUser(kc: Keycloak): User | null {
  const tokenParsed = kc.tokenParsed;
  if (!tokenParsed) return null;

  const email = (tokenParsed as Record<string, unknown>)['email'] as string | null | undefined;
  const firstName = (tokenParsed as Record<string, unknown>)['given_name'] as string | null | undefined;
  const lastName = (tokenParsed as Record<string, unknown>)['family_name'] as string | null | undefined;

  const realmAccess = (tokenParsed as Record<string, unknown>)['realm_access'] as
    | { roles?: unknown }
    | undefined;
  const clientAccess = (tokenParsed as Record<string, unknown>)['resource_access'] as
    | Record<string, { roles?: unknown }>
    | undefined;

  const realmRoles = Array.isArray(realmAccess?.roles) ? (realmAccess!.roles as string[]) : [];
  const clientRoles = clientAccess
    ? Object.values(clientAccess)
      .flatMap(a => (Array.isArray(a.roles) ? (a.roles as string[]) : []))
    : [];


  return {
    email: email ?? undefined,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
    roles: [...realmRoles, ...clientRoles],
  };
}
