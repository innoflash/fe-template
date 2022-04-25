import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticatedGuard } from '@fe-template/shared/guards/authenticated.guard';
import { UserProfileService } from '@fe-template/shared/services/user-profile.service';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let userProfileService: UserProfileService;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/cookies' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginTestComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'auth',
          component: LoginTestComponent
        }
      ])]
    });
    guard = TestBed.inject(AuthenticatedGuard);
    userProfileService = TestBed.inject(UserProfileService);
  });

  it('should be created', () => expect(guard).toBeTruthy());

  it('should lock routes when user is not authenticated (canActivate)', () => {
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(false);

    const shouldRedirect = guard.canActivate(routeMock, routeStateMock);

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledOnceWith(['auth']);
    expect(shouldRedirect).toBeTrue();
  });

  it('should unlock routes when user is authenticated (canActivate)', () => {
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
  });

  it('should lock routes when user is not authenticated (canLoad)', () => {
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(false);
    guard.canLoad({}, []);

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledOnceWith(['auth']);
  });

  it('should unlock routes when user is authenticated (canLoad)', () => {
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canLoad({}, [])).toBeTruthy();
  });
});
@Component({
  template: ''
})
export class LoginTestComponent {}
