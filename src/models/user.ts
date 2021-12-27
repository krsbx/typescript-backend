import { Model, DataTypes as DT, UUIDV4, Sequelize } from 'sequelize';
import { IUser } from '../utils/modelInterfaces';

module.exports = (sequelize: Sequelize, DataTypes: typeof DT) => {
  class User extends Model<IUser> implements IUser {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public id!: number;
    public email!: string;
    public password!: string;
    public lastName!: string;
    public firstName!: string;
    public role!: 'admin' | 'user';

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User',
    }
  );
  return User;
};
