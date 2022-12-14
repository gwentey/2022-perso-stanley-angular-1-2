import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduit } from '../interfaces/produit';
import { IUniteeProduit } from '../interfaces/uniteeProduit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private _router: Router) { }

  // permet de retourner tout les produits
  public getAllProduit(): Observable<IProduit[]> {

    return this.http.get<IProduit[]>(this.API_URL + "produits").pipe(
      catchError(this.handleError)
    );
  }
  // permet de retourner toutes les unitées produits
  public getAllUniteeProduit(): Observable<IUniteeProduit[]> {

    return this.http.get<IUniteeProduit[]>(this.API_URL + "unitee_produits").pipe(
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
