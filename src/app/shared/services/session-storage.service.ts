import { Injectable } from '@angular/core';
import { StorageService } from '@fe-template/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends StorageService {
  protected storage = sessionStorage;
}
