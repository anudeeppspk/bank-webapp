import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from './services/auth-storage/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EasyLoginGuard implements CanActivate {
  constructor(private router: Router, private authStorageSerive: AuthStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authStorageSerive.checkIsValid()) {
      this.router.navigate(['home']);
    }
    return true;
  }
  
}
