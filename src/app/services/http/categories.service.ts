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

  private saveCategoriestoDB(data: CategoryIfc): Observable<CategoryIfc> {
    return this.http.post(`${ENV.API_BASE_URL}/categories`, data);
  }

  private getFromDB(): Observable<CategoryIfc> {
    return this.http.get(`${ENV.API_BASE_URL}/categories`)
  }

  public getCategories() {
    const categories: CategoryIfc[] = [];
    const defaultCategories: CategoryIfc[] = [
      { name: 'Salary'},
      { name: 'Debt'},
      { name: 'Credit'},
      { name: 'Investments'},
    ]

    this.getFromDB().subscribe((res: object) => {

      ( Array.isArray(res) && res.length) 
        ? res.forEach((categoryName: string) => categories.push({'name': categoryName}))
        :categories.push(...defaultCategories);

      }, err => console.log(err)
    );
    
    return categories;
  }

  public saveCategories(categories: CategoryIfc[]) {
    //prep obj for DB format
    let serverObject: CategoryIfc = [];
    categories.forEach( (element: CategoryIfc) => serverObject.push(element.name) );
    
    console.log(serverObject);
    
    this.saveCategoriestoDB(serverObject).subscribe( () => {
        this.notification.msgSuccess('Categories', 'Categories saved at database');
      }, err => this.notification.msgError('Categories', 'Ooops, something went wrong')
    );
  };

}
