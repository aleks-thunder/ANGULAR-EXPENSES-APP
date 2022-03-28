import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML } from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { MongoDBService } from 'src/app/services/http/mongodb.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;

  formRegister?: any;

  inputReg: InputInterface[] = this.InputHTML.inputReg;

  constructor(
    public fb: FormBuilder,
    private Mongo: MongoDBService,
    private InputHTML: InputHTML,
    private ReactiveFormsBuilder: ReactiveFormsBuilder
  ) { }

  ngOnInit(): void {
    this.formRegister = this.ReactiveFormsBuilder.formRegister;
  }

  addUser(): void {
    console.log(typeof(this.formRegister));
    
    const valueFromFrom = this.formRegister.value;
    
    const data = {
      email: valueFromFrom.email,
      name: valueFromFrom.name,
      login: valueFromFrom.login,
      password: valueFromFrom.password,
    };

    this.Mongo.createUser(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
    );
  }
  
}
