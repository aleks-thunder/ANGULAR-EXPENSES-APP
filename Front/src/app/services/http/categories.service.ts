import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { CategoryIfc } from 'src/app/interfaces/category';
import { NotificationService } from '../notification.service';

const ENV = environment;
@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(
    private http: HttpClient,
    private notification: NotificationService
    ) {
  }

  private saveCategoriestoDB(data: CategoryIfc[]): Observable<CategoryIfc[]> {
    return this.http.post<CategoryIfc[]>(`${ENV.API_BASE_URL}/categories`, data);
  }

  private getFromDB(): Observable<CategoryIfc[]> {
    return this.http.get<CategoryIfc[]>(`${ENV.API_BASE_URL}/categories`)
  }

  public getCategories() {
    const categories: CategoryIfc[] = [];
    const defaultCategories: CategoryIfc[] = [
      { name: 'Salary'},
      { name: 'Debt'},
      { name: 'Credit'},
      { name: 'Investments'},
    ]

    this.getFromDB().subscribe(res => {
      res.length > 0
        ? res.forEach((category: CategoryIfc) => categories.push({'name': category.name}))
        : categories.push(...defaultCategories);
      }
    );
    
    return categories;
  }

  public saveCategories(categories: CategoryIfc[]) {
    //prep obj for DB format
    let categoriesArr: CategoryIfc[] = [];
    categories.forEach( (element: CategoryIfc) => categoriesArr.push(element));
    
    this.saveCategoriestoDB(categoriesArr).subscribe( {
      next: () => this.notification.msgSuccess('Categories', 'Categories saved at database'), 
      error: () => this.notification.msgError('Categories', 'Ooops, something went wrong')
    });
  };

}
