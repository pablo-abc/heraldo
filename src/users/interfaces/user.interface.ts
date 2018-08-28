export interface User {
  readonly _id?: string;
  readonly username: string;
  readonly password: string;
  readonly fullName: string;
  readonly lastName: string;
  readonly email: string;
  readonly roles?: string[];
  readonly created: Date;
  readonly modified: Date;
}
