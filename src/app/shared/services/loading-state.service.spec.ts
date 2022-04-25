import { TestBed } from '@angular/core/testing';
import { LoadingStateService } from '@fe-template/shared/services/loading-state.service';

describe('LoadingStateService', () => {
  let service: LoadingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingStateService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should set one alias to loading true', () => {
    service.start('testAlias');

    service.on('testAlias').subscribe({
      next: res => expect(res).toBeTrue()
    });

    service.on('missingAlias').subscribe(res => expect(res).toBeFalsy());
  });

  it('should set multiple aliases to loading true', () => {
    service.start(['aliasOne', 'aliasTwo']);

    service.on(['aliasOne', 'aliasTwo']).subscribe(res => expect(res).toBeTrue());
  });

  it('should set one alias to loading false', () => {
    service.end('testAlias');

    service.on('testAlias').subscribe({
      next: res => expect(res).toBeFalse()
    });

    service.on('missingAlias').subscribe(res => expect(res).toBeTruthy());
  });

  it('should set multiple aliases to loading false', () => {
    service.end(['aliasOne', 'aliasTwo']);

    service.on(['aliasOne', 'aliasTwo']).subscribe(res => expect(res).toBeFalse());
  });
});
