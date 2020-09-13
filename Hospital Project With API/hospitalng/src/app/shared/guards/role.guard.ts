import { LoginService } from './../../services/login.service';

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data[0] == this.loginService.getRole() || route.data[1] == this.loginService.getRole()) {
      return true;
    } else {
      this.router.navigate(["/public/access-denied"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
