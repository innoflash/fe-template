import { CollectionResponse } from '@fe-template/shared/models/responses/collection.response';
import { Links } from '@fe-template/shared/models/responses/links';
import { Meta } from '@fe-template/shared/models/responses/meta';

export interface PaginatedResponse<T> extends CollectionResponse<T> {
  links: Links;
  meta: Meta;
}
