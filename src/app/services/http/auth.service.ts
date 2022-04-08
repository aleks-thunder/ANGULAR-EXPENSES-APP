import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment'

const ENV = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  public register(user: any): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/register`, user)
      .pipe(map((res: any) => res));
  }

  public login(user: any): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/login`, user)
      .pipe(map((res: any) => res));
  }

  public storeUserData(token: any, user: any) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  private getToken() {
    const token = localStorage.getItem('access_token');
    this.authToken = token;
    return this.authToken
  }
}
