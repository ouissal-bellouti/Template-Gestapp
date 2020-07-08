import { Guid } from 'guid-typescript';

export class User {
  Id: string;
  Username: string;
  Password: string;
  token?: string;
}
