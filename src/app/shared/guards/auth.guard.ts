import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router, private toastr: ToastrService) { }

  canActivate(): boolean {
    if (this._authService.connecterOuPas() == true) {
      return true
    } else {
      this.toastr.error("Vous devez être connecté !")
      this._router.navigate(['connexion'])
      return false
    }
  }

}

