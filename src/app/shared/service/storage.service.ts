import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private keyPrefix: string;

  constructor() {
    this.keyPrefix = environment.storageKey;
  }

  // tslint:disable-next-line:typedef
  public storageFabric(storage: Storage) {
    return {
      setItem: (key: string, value: string): void => {
        storage.setItem(this._getKey(key), value);
      },
      getItem: (key: string): string | null => {
        return storage.getItem(this._getKey(key));
      },
      removeItem: (key: string): void => {
        storage.removeItem(this._getKey(key));
      },
      clear: (): void => {
        Object.keys(storage)
          .filter(key => key.substr(0, this.keyPrefix.length) === this.keyPrefix)
          .forEach(key => storage.removeItem(key));
      }
    };
  }

  private _getKey(key: string): string {
    key = key.trim();
    if (key.length < 0) {
      return '';
    }
    return `${ this.keyPrefix }_${ key }`;
  }
}
