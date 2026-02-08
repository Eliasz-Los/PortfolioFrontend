import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../models/user/User';

@Injectable({ providedIn: 'root' })
export class KeycloakState {
  private readonly router = inject(Router);

  private readonly _ready = signal(false);
  private readonly _authenticated = signal(false);
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);

  readonly ready = computed(() => this._ready());
  readonly authenticated = computed(() => this._authenticated());
  readonly user = computed(() => this._user());
  readonly token = computed(() => this._token());

  // Internal mutation API (called by UseAuth)
  _setReady(v: boolean): void {
    this._ready.set(v);
  }
  _setAuthenticated(v: boolean): void {
    this._authenticated.set(v);
  }
  _setUser(v: User | null): void {
    this._user.set(v);
  }
  _setToken(v: string | null): void {
    this._token.set(v);
  }
}
