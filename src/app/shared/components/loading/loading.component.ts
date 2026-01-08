import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
//Color in this case is a bootstrap contextual class
// so we can choose any of the predefined colors
// primary, secondary, success, danger, warning, info, light, dark
export class LoadingComponent {
  @Input() message: string = 'Loading...';
  @Input() variant: 'border' | 'grow' = 'border';
  @Input() color = 'primary';
}
