import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { AuthService } from 'src/app/services/http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  hide = true;
  
  formLogin!: FormGroup;
  
  inputLog: InputInterface[] = this.InputHTML.InputLog;


  constructor(
    private Auth: AuthService ,
    private InputHTML: InputHTML,
    private ReactiveFormsBuilder: ReactiveFormsBuilder,
    private Router: Router
  ) { }

  ngOnInit(): void {
    // this.MongodbService.start();
    this.formLogin = this.ReactiveFormsBuilder.formLogin;
  }

  onLogin() {
    this.Auth.login(this.formLogin.value).subscribe((token) => {
      this.Router.navigate(['/'], { queryParams: { loggedin: 'success' } });
    },
    error => {
       console.log(error.message);
    });
  }

}
