import { Jwtoken } from '@fe-template/shared/models/jwtoken';

export interface AuthResponse<T> {
  user: T;
  token: Jwtoken;
}
