import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from '@fe-template/shared/services/session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should set item in the session storage', () => {
    service.setItem('testItem', {
      testData: true
    });

    expect(sessionStorage.getItem('testItem')).toBeTruthy();
  });

  it('should store an encrypted item', () => {
    service.setItem('testItem', {
      testData: true
    });
    expect((sessionStorage.getItem('testItem') as string).includes('testData')).toBeFalse();
  });

  it('should remove item from session storage', () => {
    sessionStorage.setItem('testItem', 'The item');

    service.removeItem('testItem');

    expect(sessionStorage.getItem('testItem')).toBeFalsy();
  });

  it('should decrypt values from sessionStorage', () => {
    service.setItem('testItem', {
      testData: true
    });

    expect(service.getItem('testItem') as object).toEqual({
      testData: true
    });
  });

  it('should clear session storage', () => {
    service.setItem('testItem', {
      testData: true
    });

    service.clear();
    expect(sessionStorage.getItem('testItem')).toBeFalsy();
  });

  afterEach(() => sessionStorage.clear());
});
