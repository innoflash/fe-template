import { Directive } from '@angular/core';
import { Meta } from '@fe-template/shared/models/responses/meta';

@Directive()
export class LoadsPaginatedData {
  public currentPage = 1;
  public perPage = 1;
  public total = 0;
  protected path = '';

  protected initPagination(meta: Meta): void {
    this.currentPage = meta.current_page;
    this.total = meta.total;
    this.perPage = meta.per_page;
    this.path = meta.path;
  }
}
