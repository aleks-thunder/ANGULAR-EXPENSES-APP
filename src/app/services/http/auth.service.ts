import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from 'src/app/models/create-user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class SessionToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';
  private sessionToken: SessionToken;

  constructor(private http: HttpClient) {
    this.sessionToken = JSON.parse(localStorage.getItem('auth_meta')!) || new SessionToken();
  }

  public register(data: CreateUser): Observable<CreateUser> {
    return this.http.post(this.baseUrl + '/register', data);
  }

  public login(data: CreateUser): Observable<CreateUser> {
    localStorage.setItem('loggedUser', data.login!);
    
    return this.http.post(this.baseUrl+'/login', data).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    localStorage.removeItem('loggedUser');

    this.sessionToken = new SessionToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.sessionToken.exp));
  }

  private saveToken(token: any): any {
    this.sessionToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.sessionToken));
    return token;
  }
}
