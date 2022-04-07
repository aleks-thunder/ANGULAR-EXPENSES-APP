import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/http/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user?: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // this.auth.getProfile().subscribe(profile => {
    //   this.user = profile.user;
    // },
    //  err => {
    //    console.log(err);
    //    return false;
    //  });
  }
}
