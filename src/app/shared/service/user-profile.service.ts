import { Injectable } from '@angular/core';
import { Jwtoken } from '@fe-template/shared/models/jwtoken';
import { AuthResponse } from '@fe-template/shared/models/responses/auth.response';
import { UserModel } from '@fe-template/shared/models/user.model';
import { StorageService } from '@fe-template/shared/service/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // @ts-ignore
  public currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  public currentUser: Observable<UserModel> = this.currentUser$.asObservable();
  private userData: AuthResponse<UserModel> | undefined;

  constructor(private storage: StorageService) {
  }

  public get isLogged(): boolean {
    return !!this.userFromStorage();
  }

  public getUser(): UserModel | null {
    return this.userFromStorage() ? this.userFromStorage().user : null;
  }

  public getToken(): Jwtoken | null {
    return this.userFromStorage() ? this.userFromStorage().token : null;
  }

  public get role(): string {
    // @ts-ignore
    return this.getUser().role.name;
  }

  public get id(): number {
    // @ts-ignore
    return this.getUser().id;
  }

  public is(role: string): boolean {
    // @ts-ignore
    return this.getUser().role.name === role;
  }

  public setUser(userData: AuthResponse<UserModel>): void {
    this.userToStorage(userData);
    this.currentUser$.next(userData.user);
  }

  public updateUser(userData: AuthResponse<UserModel>): void {
    const userStore = Object.assign({ user: {} }, this.userFromStorage());
    userStore.user = Object.assign({}, userStore.user, userData);
    this.userToStorage(userStore);
    this.currentUser$.next(userStore.user);
  }

  public clearSession(): void {
    this.storage.storageFabric(sessionStorage).clear();
    this.storage.storageFabric(localStorage).clear();
    this.userData = undefined;
  }

  private userFromStorage(): AuthResponse<UserModel> {
    if (this.userData) {
      return this.userData;
    }

    return JSON.parse(this.storage.storageFabric(localStorage).getItem('user') as string);
  }

  private userToStorage(userData: AuthResponse<UserModel>): void {
    this.userData = userData;
    this.storage.storageFabric(localStorage).setItem('user', JSON.stringify(userData));
    // this.storage.storageFabric(this.remember ? localStorage : sessionStorage).setItem('user', JSON.stringify(userData));
  }
}
