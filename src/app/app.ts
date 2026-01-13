import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Navbar} from './shared/nav/navbar.component';
import {AlertComponent} from './shared/components/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('Portfolio');
}
