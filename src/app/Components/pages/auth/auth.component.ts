import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  hide = true;
  
  
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  
  inputLog: InputInterface[] = this.InputHTML.InputLog;
  inputReg: InputInterface[] = this.InputHTML.inputReg;


  constructor(
    // public fb: FormBuilder,
    private InputHTML: InputHTML,
    private ReactiveFormsBuilder: ReactiveFormsBuilder
  ) { }

  ngOnInit(): void {
    
    // this.MongodbService.start();
    this.formLogin = this.ReactiveFormsBuilder.formLogin;
    this.formRegister = this.ReactiveFormsBuilder.formRegister;
  }

  onLogin = () => this.ReactiveFormsBuilder.onSubmit(this.formLogin)
  onRegister = () => this.ReactiveFormsBuilder.onSubmit(this.formRegister)

}
