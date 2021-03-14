import {CollectionResponse} from './collection.response';
import {Links} from '@ricoffy/shared/models/pagination/links';
import {Meta} from '@ricoffy/shared/models/pagination/meta';

export interface PaginatedResponse<T> extends CollectionResponse<T> {
  links: Links;
  meta: Meta;
}
