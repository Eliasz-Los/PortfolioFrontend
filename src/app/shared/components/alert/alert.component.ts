import { Component } from '@angular/core';
import { Alert } from '../../../core/models/Alert';
import {AlertService} from '../../../core/services/alert.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alert: Alert | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      this.alert = alert;

      if (alert?.type === 'success') {
        setTimeout(() => this.close(), 4000);
      }
    });
  }

  close() {
    this.alertService.clear();
  }
}
