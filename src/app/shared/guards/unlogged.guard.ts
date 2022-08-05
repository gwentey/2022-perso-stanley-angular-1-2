import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {

  constructor(private _router : Router, private _authService: AuthService){}

  canActivate(): boolean {
    if(this._authService.connecterOuPas() == true){
      this._router.navigate([""])
      return false
    }
    return true
  }

}
