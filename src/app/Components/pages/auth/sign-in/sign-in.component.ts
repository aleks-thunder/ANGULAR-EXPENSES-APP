import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputIfc } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { AuthService } from 'src/app/services/http/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  hide = true;
  
  formLogin!: FormGroup;
  
  inputLog: InputIfc[] = this.inputHTML.InputLog;

  constructor(
    private auth: AuthService ,
    private inputHTML: InputHTML,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.reactiveFormsBuilder.formLogin;
  }

  onLogin() {
    this.auth.login(this.formLogin.value ).subscribe(data => {
      this.auth.storeUserData(data.token, data.user);
      this.notification.msgSuccess('Login', 'Are are logged in !');
      this.router.navigate(['/'])
    },
    error => {
      this.notification.msgError('Registration',error.error.error);
      console.log(error);
    }
    );
  }

}
