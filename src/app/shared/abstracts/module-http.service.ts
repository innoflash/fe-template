import { Injectable } from '@angular/core';
import { ActionResponse } from '@fe-template/shared/models/responses/action.response';
import { PaginatedResponse } from '@fe-template/shared/models/responses/paginated.response';
import { HttpApiService } from '@fe-template/shared/service/http-api.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ModuleHttpService<T = any, L = PaginatedResponse<T>, D = ActionResponse<T>> extends HttpApiService<T, L, D> {
  protected abstract module: string;
  protected abstract items: string;

  protected getRoute(url: number | string | null = null): string {
    if (!url) {
      return `${ this.module }/${ this.items }`;
    }
    
    return `${ this.module }/${ this.items }/${ url }`;
  }

  public setModule(module: string): ModuleHttpService<T, L, D> {
    this.module = module;

    return this;
  }

  public setItems(items: string): ModuleHttpService<T, L, D> {
    this.items = items;

    return this;
  }

  protected getResourcePath(): string {
    return this.getRoute();
  }
}
