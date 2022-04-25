import { Injectable } from '@angular/core';
import { EncryptionService } from '@fe-template/shared/services/encryption.service';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService {
  protected abstract storage: Storage;

  public constructor(protected readonly encryptionService: EncryptionService) {
  }

  public clear(): void {
    this.storage.clear();
  }

  public getItem<T>(key: string): T | undefined | string {
    let savedString = this.storage.getItem(key);

    if (!savedString) {
      return undefined;
    }

    savedString = this.encryptionService.decrypt(savedString);
    if (savedString.startsWith('{')) {
      return JSON.parse(savedString) as T;
    }

    return savedString;
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public setItem(key: string, value: string | object): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    this.storage.setItem(key, this.encryptionService.encrypt(value).toString());
  }
}
