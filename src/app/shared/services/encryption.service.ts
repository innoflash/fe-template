import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  public encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, environment.encryptionKey).toString();
  }

  public decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
  }
}
