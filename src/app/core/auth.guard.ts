import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.checkUser();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.authService.checkUser();
  }
}
