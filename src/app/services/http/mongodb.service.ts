import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/models/create-user';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<CreateUser> {
    return this.http.post(baseUrl, data);
  }
}
