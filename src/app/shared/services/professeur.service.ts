import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfesseur } from '../interfaces/professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private _router: Router) { }

  // permet de retourner tout les produits
  public getAllProfesseur(): Observable<IProfesseur[]> {

    return this.http.get<IProfesseur[]>(this.API_URL + "professeurs").pipe(
      catchError(this.handleError)
    );
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
