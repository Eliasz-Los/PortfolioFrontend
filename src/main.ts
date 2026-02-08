import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {keycloakAuth} from './app/core/services/auth/KeycloakAuthService';

AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: true
});

(async () => {
  try {
    await keycloakAuth.init(); // wait for Keycloak init to finish
    await bootstrapApplication(App, appConfig);
  } catch (err) {
    console.error('Bootstrap failed:', err);
  }
})();
