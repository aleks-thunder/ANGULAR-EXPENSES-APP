import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private notification: NotificationsService) {}

  msgSuccess(title: string, message: string) {
    this.notification.success(title, message, {
      position: ["top", "right"],
      timeOut: 3000,
      animate: "fade",
      showProgressBar: true,
    });
  }

  msgError(title: string, message: string) {
    this.notification.error(title, message, {
      position: ["top", "right"],
      timeOut: 5000,
      animate: "fade",
      showProgressBar: true,
    });
  }

  msgWarning(title: string, message: string) {
    this.notification.warn(title, message, {
      position: ["top", "right"],
      timeOut: 5000,
      animate: "fade",
      showProgressBar: true,
    });
  }
}
