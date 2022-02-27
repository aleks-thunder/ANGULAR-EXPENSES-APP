import { Component, OnInit } from '@angular/core';

import { productSales, productSalesMulti } from '../../data/chart-prod';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  productSales: any
  productSalesMulti: any

  view: any = [700, 370];
  constructor() { Object.assign(this, { productSales, productSalesMulti }); }

  ngOnInit(): void {
  }

  
}
