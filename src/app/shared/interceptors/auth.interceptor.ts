import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileService } from '@fe-template/shared/service/user-profile.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userProfileService: UserProfileService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userProfileService.isLogged) {

      if (req.body instanceof FormData) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${ this.userProfileService.getToken()?.access_token }`
          }
        });
        
        return next.handle(req);
      }

      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${ this.userProfileService.getToken()?.access_token }`
        }
      });
    }
    
    return next.handle(req);
  }

}
