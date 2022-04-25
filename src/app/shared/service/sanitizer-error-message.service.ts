import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SanitizerErrorMessageService {
  constructor() { }

  public sanitizeMessage(res: HttpErrorResponse): string[] {
    const messages: string[] = [];
    messages.push(res.error.message);

    if (res.error.errors) {
      for (const value in res.error.errors) {
        if (Array.isArray(res.error.errors[value])) {
          res.error.errors[value].forEach((item: string) => {
            messages.push(item);
          });
        }
      }
    }

    return messages;
  }
}
