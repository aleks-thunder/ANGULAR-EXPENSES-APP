import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "@services/loader.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("access_token");

    this.loader.start();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", idToken),
      });
      return next.handle(cloned).pipe(
        finalize(() =>
          setTimeout(() => {
            this.loader.stop();
          }, 200),
        ),
      );
    } else {
      return next.handle(req).pipe(
        finalize(() =>
          setTimeout(() => {
            this.loader.reset();
          }, 200),
        ),
      );
    }
  }
}
