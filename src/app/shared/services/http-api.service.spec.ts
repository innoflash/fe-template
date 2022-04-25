import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '@fe-template/shared/shared.module';

import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  let service: HttpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ]
    });
    service = TestBed.inject(HttpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
