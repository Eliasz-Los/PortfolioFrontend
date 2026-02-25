import {AfterViewInit, Component, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {Navbar} from './shared/nav/navbar.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {filter} from 'rxjs';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App  implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        // wait one tick so the new route DOM is actually rendered
        setTimeout(() => AOS.refreshHard(), 0);
      });
  }

  protected readonly title = signal('Portfolio');
}
