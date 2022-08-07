import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var jwt = localStorage.getItem('jwt')
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + jwt,
        accept: "application/json"

      }
    })
    return next.handle(tokenizedReq);
  }
}
