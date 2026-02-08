import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {keycloakAuth} from '../../core/services/auth/KeycloakAuthService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class Navbar {
  keycloak = keycloakAuth;

  protected readonly keycloakAuth = keycloakAuth;
}
