import { NamedModel } from '@fe-template/shared/models/named.model';

export interface RoleModel extends NamedModel {
  guard_name: string;
}
