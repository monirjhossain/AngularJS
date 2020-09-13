import { LoginService } from './../../services/login.service';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/public/sign-in"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
