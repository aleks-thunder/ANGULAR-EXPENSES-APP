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

  register(user: any): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/register`, user)
      .pipe(map((res: any) => res));
  }

  login(user: any): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/login`, user)
      .pipe(map((res: any) => res));
  }

  // getProfile() {
  //   return this.http.get(ENV.API_BASE_URL + 'dashboard')
  //     .pipe(map((res: any) => res));
  // }

  storeUserData(token: any, user: any) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.authToken = token;
    return this.authToken
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.loadToken());
  }
}

// 17:54  