import { Component, OnInit } from "@angular/core";
// import { FormBuilder} from '@angular/forms';
import { Input } from "@shared/types/input";
import { InputHTML } from "src/app/shared/helpers/input-html";
import { ReactiveFormsBuilder } from "@shared/helpers/form-bilders";
import { AuthService } from "@services/http/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "@services/notification.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  formRegister!: FormGroup;

  inputReg: Input[] = this.inputHTML.inputReg;

  constructor(
    private auth: AuthService,
    private inputHTML: InputHTML,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private router: Router,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.formRegister = this.reactiveFormsBuilder.formRegister;
  }

  onSignUp(): void {
    this.auth.register(this.formRegister.value).subscribe({
      next: () => {
        this.notification.msgSuccess("Registration", "Account successfule created!");
        this.formRegister.reset();
        this.router.navigate(["/login"]);
      },
      error: error => this.notification.msgError("Registration", error.error.error),
    });
  }
}
