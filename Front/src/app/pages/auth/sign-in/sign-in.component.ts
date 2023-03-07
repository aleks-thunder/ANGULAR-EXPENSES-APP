import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Input } from "@shared/types/input";
import { InputHTML } from "src/app/shared/helpers/input-html";
import { ReactiveFormsBuilder } from "@shared/helpers/form-bilders";
import { AuthService } from "@services/http/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "@services/notification.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  hide = true;

  formLogin!: FormGroup;

  inputLog: Input[] = this.inputHTML.InputLog;

  constructor(
    private auth: AuthService,
    private inputHTML: InputHTML,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private router: Router,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.formLogin = this.reactiveFormsBuilder.formLogin;
  }

  onLogin() {
    this.auth.login(this.formLogin.value).subscribe({
      next: data => {
        this.auth.storeUserData(data.token, data.user);
        this.notification.msgSuccess("Login", "Are are logged in !");
        this.router.navigate(["/"]);
      },
      error: error => this.notification.msgError("Registration", error.error.error),
    });
  }
}
