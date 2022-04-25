import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UserProfileService } from '@fe-template/shared/services/user-profile.service';

@Injectable()
export abstract class ParentAuthGuard implements CanActivate, CanLoad {
  protected abstract shouldBeLoggedIn: boolean;
  protected abstract redirectUrl: string;

  public constructor(protected router: Router, protected userProfileService: UserProfileService) {
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.resolveGuard(this.userProfileService.isLoggedIn());
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.resolveGuard(this.userProfileService.isLoggedIn());
  }

  private resolveGuard(systemUserLoggedIn: boolean): boolean {
    if (systemUserLoggedIn === this.shouldBeLoggedIn) {
      return true;
    }

    return !this.router.navigate([this.redirectUrl]);
  }
}


