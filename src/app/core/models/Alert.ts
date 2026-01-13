export type AlertType = 'success' | 'warning' | 'danger' | 'info';

export interface Alert {
  message: string;
  type: AlertType;
}
