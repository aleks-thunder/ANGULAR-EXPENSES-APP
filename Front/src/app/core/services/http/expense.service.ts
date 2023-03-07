import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExpenseItem } from "@shared/types/expense-item";
import { environment } from "@env/environment";
import { filter, map } from "rxjs/operators";

const ENV = environment;
@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  public addExpense(data: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post<ExpenseItem>(ENV.API_BASE_URL, data);
  }

  public getExpense(): Observable<ExpenseItem[]> {
    // expenses
    return this.http.get<ExpenseItem[]>(`${ENV.API_BASE_URL}/dashboard`).pipe(filter(Boolean));
  }

  public updateExpense(itemId = "", item: ExpenseItem): Observable<ExpenseItem> {
    return this.http.put<ExpenseItem>(`${ENV.API_BASE_URL}/dashboard/${itemId}`, item);
  }

  public deleteExpense(item: ExpenseItem): Observable<ExpenseItem> {
    return this.http.delete<ExpenseItem>(`${ENV.API_BASE_URL}/dashboard/${item._id}`);
  }

  public deleteAllExpenses(): Observable<ExpenseItem[]> {
    return this.http.delete<ExpenseItem[]>(`${ENV.API_BASE_URL}/dashboard`);
  }
}
