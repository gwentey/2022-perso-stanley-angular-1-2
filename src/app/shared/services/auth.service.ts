import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private _router : Router) { }


  public seConnecter(pseudo: string, password : string): Observable<IUser> {

    const form = {
      "username" : pseudo,
      "password" : password
    };

    return this.http.post<IUser>("https://localhost:8000/apip/security", form).pipe(
      tap(utilisateur => console.log('Connecté !')),
      catchError(this.handleError)
    );
  }

  public setCurrentUtilisateur(user : IUser): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public connecterOuPas(): boolean {
    if(localStorage.getItem("user") == null){
      return false
    }
    return true
  }

  public getCurrentUtilisateur() : IUser {
   return JSON.parse(localStorage.getItem("user")!);
  }

  public seDeconnecter() : void {
    localStorage.clear();
    this._router.navigate(["connexion"])
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
