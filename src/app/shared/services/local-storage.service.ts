import { Injectable } from '@angular/core';
import { StorageService } from '@fe-template/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService {
  protected storage = localStorage;
}
