import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { environment } from '../../../environments/environment'

const ENV = environment;
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  constructor(
    private http: HttpClient,
    ) {
  }

  public pushExpenseToDB(data: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post(ENV.API_BASE_URL, data);
  }

  public getExpenseFromDB(): Observable<ExpenseItem> {
    return this.http.get(`${ENV.API_BASE_URL}/dashboard`)
  }

}
