import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {}
    canActivate(): boolean {
    if (!this._userService.Score()) {
      this._router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
  
}
