import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileService } from '@fe-template/shared/services/user-profile.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptor implements HttpInterceptor {
  public constructor(private readonly userProfileService: UserProfileService) {
  }


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userProfileService.isLoggedIn()) {

      if (req.body instanceof FormData) {
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${ this.userProfileService }` //TODO add user auth token to the request
          }
        });

        return next.handle(req);
      }

      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${ this.userProfileService }` //TODO add user auth token to the request
        }
      });
    }

    return next.handle(req);
  }

}
