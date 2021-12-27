import { Sequelize } from 'sequelize';

export interface IUser {
  id: number;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Update this when the models increase
export interface IModels {
  User: IUser;
  sequelize: Sequelize;
  Sequelize: Sequelize;
}
