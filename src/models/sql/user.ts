import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import sequelize from '../../loaders/database';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  email_verification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  _deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  _last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default User;
