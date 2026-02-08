import Keycloak from 'keycloak-js';
import {environment} from '../../../../env/environment';


class KeycloakAuthService {
  private kc: Keycloak | null = null;

  async init(): Promise<void> {
    this.kc = new Keycloak({
      url: environment.keycloak.url.replace(/\/+$/, ''),
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });

    await this.kc.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256',
      checkLoginIframe: false,
      flow: 'standard',
    });
  }

  isAuthenticated(): boolean {
    return Boolean(this.kc?.authenticated);
  }

  login(redirectUri: string = window.location.origin): Promise<void> {
    if (!this.kc) throw new Error('Keycloak not initialized');
    return this.kc.login({ redirectUri }) as unknown as Promise<void>;
  }

  logout(redirectUri: string = window.location.origin): Promise<void> {
    if (!this.kc) throw new Error('Keycloak not initialized');
    return this.kc.logout({ redirectUri }) as unknown as Promise<void>;
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.kc) throw new Error('Keycloak not initialized');
    if (!this.kc.authenticated) return null;

    await this.kc.updateToken(30);
    return this.kc.token ?? null;
  }
}

export const keycloakAuth = new KeycloakAuthService();
