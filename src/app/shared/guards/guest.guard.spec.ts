import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GuestGuard } from '@fe-template/shared/guards/guest.guard';
import { UserProfileService } from '@fe-template/shared/services/user-profile.service';

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let userProfileService: UserProfileService;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/cookies' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTestComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'dashboard',
          component: DashboardTestComponent
        }
      ])]
    });
    guard = TestBed.inject(GuestGuard);
    userProfileService = TestBed.inject(UserProfileService);
  });

  it('should be created', () => expect(guard).toBeTruthy());

  it('should lock routes when user is authenticated (canActivate)', () => {
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(true);

    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalsy();
  });

  it('should unlock routes when user is not authenticated (canActivate)', () => {
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(false);

    const shouldRedirect = guard.canActivate(routeMock, routeStateMock);
    expect(shouldRedirect).toBeTrue();
  });

  it('should lock routes when user is authenticated (canLoad)', () => {
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(true);

    expect(guard.canLoad({}, [])).toBeTruthy();

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledOnceWith(['dashboard']);
  });

  it('should unlock routes when user is not authenticated (canLoad)', () => {
    spyOn(userProfileService, 'isLoggedIn').and.returnValue(false);
    expect(guard.canLoad({}, [])).toBeTrue();
  });
});

@Component({
  template: ''
})
export class DashboardTestComponent {}
