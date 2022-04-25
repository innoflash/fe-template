import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@fe-template/shared/services/local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should set item in the local storage', () => {
    service.setItem('testItem', {
      testData: true
    });

    expect(localStorage.getItem('testItem')).toBeTruthy();
  });

  it('should store an encrypted item', () => {
    service.setItem('testItem', {
      testData: true
    });
    expect((localStorage.getItem('testItem') as string).includes('testData')).toBeFalse();
  });

  it('should remove item from local storage', () => {
    localStorage.setItem('testItem', 'The item');

    service.removeItem('testItem');

    expect(localStorage.getItem('testItem')).toBeFalsy();
  });

  it('should decrypt values from localStorage', () => {
    service.setItem('testItem', {
      testData: true
    });

    expect(service.getItem('testItem') as object).toEqual({
      testData: true
    });
  });

  it('should clear local storage', () => {
    service.setItem('testItem', {
      testData: true
    });

    service.clear();
    expect(localStorage.getItem('testItem')).toBeFalsy();
  });

  afterEach(() => localStorage.clear());
});
