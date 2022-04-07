import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notification: NotificationsService
  ) { }

  public msgSuccess(title: string, message: string) {
    this.notification.success(title, message, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  public msgError(title: string, message: string) {
    this.notification.error(title, message, {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animate: 'fade',
      showProgressBar: true
    });
  }
  
}
