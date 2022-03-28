import { Injectable } from '@angular/core';
import { InputInterface } from '../interfaces/input';

@Injectable({
  providedIn: 'root'
})

export class InputHTML {

  inputComponent: InputInterface[] = [
    { label: 'Category',     type:'text',    form:'category' },
    { label: 'Description',  type:'text',    form:'description' },
    { label: 'Amount',       type:'number',  form:'amount' },
    { label: 'Datepicker',   type:'text',    form:'date' }
  ];

  InputLog: InputInterface[] = [
    { label: 'login',    type:'text', form:'login' },
    { label: 'password', type:'text', form:'password' }
  ];
  
  inputReg: InputInterface[] = [
    { label: 'email',    type:'email',    form:'email' },
    { label: 'name',     type:'text',     form:'name' },
    { label: 'login',    type:'text',     form:'login' },
    { label: 'password', type:'password', form:'password' },
    { label: 'password2', type:'password', form:'passVisible' }
  ];

  constructor() { }

}
