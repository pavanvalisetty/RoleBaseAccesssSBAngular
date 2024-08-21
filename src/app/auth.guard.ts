import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger
    /* let isLoggedId = localStorage.getItem('isLoggedId');
     this.authService.getUsersForRole
     if (isLoggedId == 'false') {
       alert(' Not authenticated User !!')
       return false;
     }
     return true;
   }
    const expectedRole = next.data[`expectedRole`];
    const currentRole = this.authService.getRole();
    if (!this.authService.isAuthenticated() || currentRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }*/
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


}

