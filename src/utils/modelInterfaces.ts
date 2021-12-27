export interface IUser {
  id: number;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  role: 'admin' | 'user';
}

export interface IModels {
  user: IUser;
}
