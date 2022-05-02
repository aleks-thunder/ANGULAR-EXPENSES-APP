import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment'
import { UserIfc } from 'src/app/interfaces/create-user';

const ENV = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: string = '';
  user: string = '';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  public register(user: UserIfc): Observable<UserIfc> {
    return this.http.post(`${ENV.API_BASE_URL}/register`, user)
      .pipe(map((res: UserIfc) => res));
  }

  public login(user: UserIfc): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/login`, user)
      .pipe(map((res: UserIfc) => res));
  }

  public storeUserData(token: string, user: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public logout() {
    this.authToken = '';
    this.user = '';
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  private getToken() {
    const token = localStorage.getItem('access_token');
    if(typeof token === 'string') 
      this.authToken = token;
    return this.authToken;
  }
}
