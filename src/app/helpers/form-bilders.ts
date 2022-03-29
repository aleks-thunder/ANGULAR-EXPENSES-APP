import { OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ReactiveFormsBuilder implements OnInit{

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();


  formLogin: FormGroup = this.fb.group({
    login:    ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  formRegister: FormGroup = this.fb.group({
    name:         ['', [Validators.required]],
    login:        ['', [Validators.required, Validators.minLength(4)]],
    email:        ['', [Validators.required]],
    password:     ['', [Validators.required, Validators.minLength(8)]],
    passConfirm:  ['', [Validators.required, Validators.minLength(8)]],
  });

  formInputMainPage: FormGroup = this.fb.group({
    date:         [new Date().toISOString()],
    category:     ['',  [Validators.required]],
    description:  ['',  [Validators.required]],
    amount:       [NaN, [Validators.required]],
    id:           [''], 
  });
  
  constructor( public fb: FormBuilder ) { };

  ngOnInit(): void {
  };

  onSubmit(formName: FormGroup) {
    this.formSubmit.emit(formName.value);
    console.log(formName.value);
    
  }
}