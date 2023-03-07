import { OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReactiveFormsBuilder implements OnInit {
  formRegister: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    login: ["", [Validators.required, Validators.minLength(4)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    passConfirm: ["", [Validators.required, Validators.minLength(8)]],
  });

  formLogin: FormGroup = this.fb.group({
    login: ["", [Validators.required, Validators.minLength(4)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  formInputMainPage: FormGroup = this.fb.group({
    date: [new Date().toISOString().substring(0, 10), [Validators.required]],
    category: ["", [Validators.required]],
    description: ["", [Validators.required]],
    amount: [NaN, [Validators.required]],
  });

  formEdit: FormGroup = this.fb.group({
    date: ["", [Validators.required]],
    category: ["", [Validators.required]],
    description: ["", [Validators.required]],
    amount: [0, [Validators.required]],
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {}
}
