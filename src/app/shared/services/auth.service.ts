import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';


import { IUser } from '../interfaces/user';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private _router: Router, private toastr: ToastrService) { }

  // permet de se connecter
  public seConnecter(pseudo: string, password: string): Observable<any> {

    const form = {
      "username": pseudo,
      "password": password
    };

    return this.http.post<any>(this.API_URL + "security", form).pipe(
      catchError(this.handleError)
    );
  }

  // obtiens les informations de l'utilisateur connecté en décodant son JWT Token
  public getCurrentUtilisateur(): IUser {
    const token = localStorage.getItem("jwt")

    var decodToken = this.jwtHelper.decodeToken(token!);

    return {
      id: decodToken.id,
      nom: decodToken.nom,
      prenom: decodToken.prenom,
      roles: decodToken.roles,
      username: decodToken.username,
      profile: decodToken.profile
    }
  }


  // indique si l'utilisateur est connecté ou non grace à son JWT Token
  public connecterOuPas(): boolean {
    const token = localStorage.getItem("jwt")

    if (!token || token === "") {
      localStorage.removeItem("jwt");
      return false
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      localStorage.removeItem("jwt");
      this._router.navigate(["connexion"])
      return false
    }

    if (this.jwtHelper.isTokenExpired(token!)) {
      localStorage.removeItem("jwt");
      this.toastr.error('Par sécurité après 8h de connexion votre session se ferme automatiquement', "Déconnecté",
        { timeOut: 10000 })
      this._router.navigate(["connexion"])
      return false
    }


    return !this.jwtHelper.isTokenExpired(token!)
  }

  // supprime le JWT Token et redirige l'utilisateur vers la page de connexion
  public seDeconnecter(): void {
    this.toastr.error("Déconnecté")
    localStorage.removeItem("jwt");
    this._router.navigate(["connexion"])
  }

  // met a jour le profil utilisateur
  public majUser(user: IUser) {
    var body = {
      "nom": user.nom,
      "prenom": user.prenom,
      "profile": user.profile,
      "username": user.username
    }

    return this.http.put<any>(this.API_URL + "me/majuser", body).pipe(
      catchError(this.handleError)
    )
  }

  // permet de changer le mot de passe
  public changePassword(password: string) {

    var body = {
      "password": password
    }

    return this.http.put<any>(this.API_URL + "me/changepassword", body).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
