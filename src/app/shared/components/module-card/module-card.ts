import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [
    NgStyle,
    NgOptimizedImage
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

  get bgUrl(): string | null {
    if (!this.image) return null;
    return this.image.startsWith('assets/')
      ? '/' + this.image
      : this.image;
  }
}
