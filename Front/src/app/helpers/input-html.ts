import { Injectable } from '@angular/core';
import { InputIfc } from '../interfaces/input';

@Injectable({
  providedIn: 'root'
})

export class InputHTML {

  inputComponent: InputIfc[] = [
    { label: 'Category',     type:'text',    form:'category' },
    { label: 'Description',  type:'text',    form:'description' },
    { label: 'Amount',       type:'number',  form:'amount' },
    { label: 'Datepicker',   type:'text',    form:'date' }
  ];

  InputLog: InputIfc[] = [
    { label: 'Login',    type:'text', form:'login' },
    { label: 'Password', type:'text', form:'password' }
  ];
  
  inputReg: InputIfc[] = [
    { label: 'Name',     type:'text',     form:'name' },
    { label: 'Login',    type:'text',     form:'login' },
    { label: 'Email',    type:'email',    form:'email' },
    { label: 'Password', type:'password', form:'password' },
    { label: 'Confirmation', type:'password', form:'passConfirm' }
  ];

  constructor() { }

}
