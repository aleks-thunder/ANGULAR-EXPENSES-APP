import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/http/auth.service";
import { NotificationService } from "@services/notification.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private notification: NotificationService) {}

  ngOnInit(): void {}

  onLogout() {
    this.auth.logout();
    this.notification.msgSuccess("Logout", "You are logged out!");
    this.router.navigate(["/login"]);
    return false;
  }
}
