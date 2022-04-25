import { Injectable } from '@angular/core';
import { LocalStorageService } from '@fe-template/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


  public constructor(private readonly localStorageService: LocalStorageService) {
  }

  public isLoggedIn(): boolean {
    this.localStorageService.getItem<string>('test');

    return false; //TODO resolve the test case.
  }
}
