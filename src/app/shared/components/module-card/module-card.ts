import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-module-card',
  imports: [
    NgStyle
  ],
  templateUrl: './module-card.html',
  styleUrl: './module-card.css'
})
export class ModuleCardComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() route!: string;

  constructor(private router: Router) {}

  navigate(){
    this.router.navigate([this.route]);
  }
}
