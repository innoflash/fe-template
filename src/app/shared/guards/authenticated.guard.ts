import { Injectable } from '@angular/core';
import { ParentAuthGuard } from '@fe-template/shared/guards/parent-auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard extends ParentAuthGuard {
  protected redirectUrl = 'auth';
  protected shouldBeLoggedIn = true;
}
