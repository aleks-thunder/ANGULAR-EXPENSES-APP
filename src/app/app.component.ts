import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/http/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ANGULAR-EXPENSES-APP';

  constructor(public Auth: AuthService, private router: Router) { }
  userDisplayName?: string
  ngOnInit(): void {
    this.userDisplayName = JSON.stringify(localStorage.getItem('loggedUser'));
  }

  logout(): void {
    this.Auth.logout();
    this.router.navigate(['/login'], {queryParams: {loggedOut: 'success'}});
  }
}
