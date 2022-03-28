import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';

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
    // public fb: FormBuilder,
    private InputHTML: InputHTML,
    private ReactiveFormsBuilder: ReactiveFormsBuilder
  ) { }

  ngOnInit(): void {
    
    // this.MongodbService.start();
    this.formLogin = this.ReactiveFormsBuilder.formLogin;
  }

  onLogin = () => this.ReactiveFormsBuilder.onSubmit(this.formLogin)
}
