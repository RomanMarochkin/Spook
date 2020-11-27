import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MainService } from './main.service';
@Injectable()
export class NotAuthService implements CanActivate {
  constructor(public service: MainService, public router: Router) {}
  canActivate(): boolean {
    if (this.service.isAuthenticated()) {
      this.router.navigate(['users']);
      return false;
    }
    return true;
  }
}