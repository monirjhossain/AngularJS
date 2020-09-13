import { LoginService } from './../../services/login.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from "@angular/core";


@Injectable()
export class appConstants implements HttpInterceptor {

  token = null;
  constructor(public injector: Injector) { }
  public serverPath: string = "https://localhost:44336/api/";
  loginService = this.injector.get(LoginService);
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
      // Authorization: `Bearer ${this.loginService.getToken()}`
    })

  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let loginService = this.injector.get(LoginService);
    var changedReq;
    if (loginService.isLoggedIn() != null) {
      changedReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
          // Authorization: `bearer ${loginService.getToken()}`
        },
      });
      return next.handle(changedReq);
    } else {
      changedReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        }
      });
      return next.handle(changedReq);
    }
  }
}