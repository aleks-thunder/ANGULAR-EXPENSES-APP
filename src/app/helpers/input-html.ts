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
    { label: 'Login',    type:'text', form:'login' },
    { label: 'Password', type:'text', form:'password' }
  ];
  
  inputReg: InputInterface[] = [
    { label: 'Name',     type:'text',     form:'name' },
    { label: 'Login',    type:'text',     form:'login' },
    { label: 'Email',    type:'email',    form:'email' },
    { label: 'Password', type:'password', form:'password' },
    { label: 'Confirmation', type:'password', form:'passConfirm' }
  ];

  constructor() { }

}
