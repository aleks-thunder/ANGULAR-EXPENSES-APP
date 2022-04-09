import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';
import { CategoryInterface } from 'src/app/interfaces/category';

const ENV = environment;
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(
    private http: HttpClient,
    ) {
  }

  public saveCategories(data: CategoryInterface): Observable<ExpenseItem> {
    return this.http.post(`${ENV.API_BASE_URL}/categories`, data);
  }

  public getCategories(): Observable<ExpenseItem> {
    return this.http.get(`${ENV.API_BASE_URL}/categories`)
  }

}
