import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from 'src/app/+state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivate(): boolean {
    if (localStorage.getItem('accessGranted')) {
      return true;
    }
    this.router.navigate([`/login`]);
    return false;
  }
}
