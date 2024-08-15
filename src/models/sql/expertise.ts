import { DataTypes } from 'sequelize';
import sequelize from '../../loaders/database';

const Expert = sequelize.define('expertise', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  speaker_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // or 'speakers' if you rename the model
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Expert;
