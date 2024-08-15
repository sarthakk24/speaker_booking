import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import sequelize from '../../loaders/database';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUIDV4,
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
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'speaker'),
    allowNull: false,
  },
  email_verification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  price_per_session: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  expertise: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'expertise',
      key: 'id',
    },
  },
  _deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  _last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default User;
