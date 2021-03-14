import { NamedModel } from '@ricoffy/shared/models/named.model';

export interface UserModel extends NamedModel {
  email: string;
  phone: string;
}
