import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "@env/environment";
import { User } from "@shared/types/create-user";

const ENV = environment;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public register(user: User): Observable<User> {
    return this.http.post(`${ENV.API_BASE_URL}/register`, user);
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${ENV.API_BASE_URL}/login`, user);
  }

  public storeUserData(token: string, user: string) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  public logout() {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem("access_token")!);
  }
}
