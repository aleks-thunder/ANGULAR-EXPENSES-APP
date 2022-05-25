export interface ExpenseItem  {
  _id?: string;
  date?: string;
  category?: string;
  description?: string;
  amount?: number;
  
  //methods
  reduce?: any;
  length?: number;
  sort?: any;
  filter?: any;
  map?: any;
}
