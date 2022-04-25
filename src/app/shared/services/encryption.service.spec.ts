import { TestBed } from '@angular/core/testing';
import { EncryptionService } from '@fe-template/shared/services/encryption.service';


describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should encrypt string values', () => {
    const encryptedString = service.encrypt('test value');

    expect(encryptedString === 'test value').toBeFalse();
  });

  it('should decrypt string values', () => {
    const encryptedString = service.encrypt('test value');

    expect(service.decrypt(encryptedString)).toBe('test value');
  });
});
