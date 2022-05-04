import { Component, OnInit } from '@angular/core';
// import { FormBuilder} from '@angular/forms';
import { InputIfc } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { AuthService } from 'src/app/services/http/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formRegister!: FormGroup;

  inputReg: InputIfc[] = this.inputHTML.inputReg;

  constructor(
    private auth: AuthService,
    private inputHTML: InputHTML,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private router: Router,
    private notification: NotificationService,
    private loader: LoaderService

  ) { }

  ngOnInit(): void {
    this.formRegister = this.reactiveFormsBuilder.formRegister;
    this.loader.isLoading.next(true);
    setTimeout(() => this.loader.isLoading.next(false), 500);
  }

  onSignUp(): void {
    this.auth.register(this.formRegister.value).subscribe(data => {
      this.notification.msgSuccess('Registration','Account successfule created!');
      this.formRegister.reset();
      this.router.navigate(['/login']);
    },
    error => {
      this.notification.msgError('Registration',error.error.error);
      console.log(error);
    }
    );
  }
  
}
