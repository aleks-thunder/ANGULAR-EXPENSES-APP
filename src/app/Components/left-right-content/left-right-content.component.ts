import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const dateFormat = {
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-left-right-content',
  templateUrl: './left-right-content.component.html',
  styleUrls: [ './left-right-content.component.scss' ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ],
    },

    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ],
})
export class LeftRightContentComponent implements OnInit {

  faPen = faPen;
  todayDate: Date = new Date();

  constructor() { }
  
  ngOnInit(): void {
  }

}
