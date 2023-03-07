import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Category } from "@shared/types/category";
import { NotificationService } from "../notification.service";

const ENV = environment;
@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient, private notification: NotificationService) {}

  private saveCategoriestoDB(data: Category[]): Observable<Category[]> {
    return this.http.post<Category[]>(`${ENV.API_BASE_URL}/categories`, data);
  }

  private getFromDB(): Observable<Category[]> {
    return this.http.get<Category[]>(`${ENV.API_BASE_URL}/categories`);
  }

  public getCategories() {
    const categories: Category[] = [];
    const defaultCategories: Category[] = [
      { name: "Salary" },
      { name: "Debt" },
      { name: "Credit" },
      { name: "Investments" },
    ];

    this.getFromDB().subscribe(res => {
      res.length > 0
        ? res.forEach((category: Category) => categories.push({ name: category.name }))
        : categories.push(...defaultCategories);
    });

    return categories;
  }

  public saveCategories(categories: Category[]) {
    //prep obj for DB format
    let categoriesArr: Category[] = [];
    categories.forEach((element: Category) => categoriesArr.push(element));

    this.saveCategoriestoDB(categoriesArr).subscribe({
      next: () => this.notification.msgSuccess("Categories", "Categories saved at database"),
      error: () => this.notification.msgError("Categories", "Ooops, something went wrong"),
    });
  }
}
