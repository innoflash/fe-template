import { NamedModel } from '@fe-template/shared/models/named.model';
import { RoleModel } from '@fe-template/shared/models/role.model';

export interface UserModel extends NamedModel {
  email: string;
  phone: string;
  role: RoleModel;
}
