import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { CategoryInterface } from 'src/app/interfaces/category';
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

  private saveCategoriestoDB(data: CategoryInterface): Observable<CategoryInterface> {
    return this.http.post(`${ENV.API_BASE_URL}/categories`, data);
  }

  private getFromDB(): Observable<CategoryInterface> {
    return this.http.get(`${ENV.API_BASE_URL}/categories`)
  }

  public getCategories() {
    const categories: CategoryInterface[] = [];
    const defaultCategories: CategoryInterface[] = [
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

  public saveCategories(categories: any) {
    //prep obj for DB format
    let serverObject: any = [];
    categories.forEach( (element: any) => serverObject.push(element.name) );
    
    this.saveCategoriestoDB(serverObject).subscribe( () => {
        this.notification.msgSuccess('Categories', 'Categories saved at database');
      }, err => this.notification.msgError('Categories', 'Ooops, something went wrong')
    );
  };

}
