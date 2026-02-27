import {Component, effect, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {UseAuth} from '../../core/services/auth/useAuth';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {
  private readonly auth = inject(UseAuth);

  ready = this.auth.ready;
  authenticated = this.auth.authenticated;
  user = this.auth.user;
  token = this.auth.token;

  constructor() {
    effect(() => {
      if (!this.ready()) void this.auth.init();
    });
  }

  login(): void {
    void this.auth.login();
  }

  logout(): void {
    void this.auth.logout();
  }

  refresh(): void {
    void this.auth.refresh();
  }
}
