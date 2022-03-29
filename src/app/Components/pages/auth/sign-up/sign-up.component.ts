import { Component, OnInit } from '@angular/core';
// import { FormBuilder} from '@angular/forms';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { AuthService } from 'src/app/services/http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // ! hide = true; tb implement later

  formRegister!: any;

  inputReg: InputInterface[] = this.InputHTML.inputReg;

  constructor(
    // public fb: FormBuilder,
    private Auth: AuthService,
    private InputHTML: InputHTML,
    private ReactiveFormsBuilder: ReactiveFormsBuilder,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.formRegister = this.ReactiveFormsBuilder.formRegister;
  }

  onSignUp(): void {
    
    this.Auth.register(this.formRegister.value).subscribe(response => {
        console.log('User created:'+ JSON.stringify({response}), null);
        this.formRegister.reset();
        this.Router.navigate(['/login'], { queryParams: { newUserCreated: 'success' } })
      },
      error => {
        console.log(error.message);
      }
    );
  }
  
}
