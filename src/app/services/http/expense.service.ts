import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { environment } from '../../../environments/environment'
import { filter, map } from 'rxjs/operators';

const ENV = environment;
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  constructor( private http: HttpClient ) {
  }

  public addExpense(data: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post(ENV.API_BASE_URL, data);
  }

  public getExpense(): Observable<ExpenseItem> {
    return this.http.get(`${ENV.API_BASE_URL}/dashboard`).pipe(filter(Boolean));
  }

  public updateExpense(itemId: any, item: ExpenseItem): Observable<ExpenseItem> {
    return this.http.put(`${ENV.API_BASE_URL}/dashboard/${itemId}`, item).pipe(map((res: any) => res));
  }

  public deleteExpense(item: ExpenseItem): Observable<ExpenseItem> {
    return this.http.delete(`${ENV.API_BASE_URL}/dashboard/${item._id}`).pipe(map((res: any) => res));
  }
}
