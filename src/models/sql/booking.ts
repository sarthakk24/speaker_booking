import { DataTypes } from 'sequelize';
import sequelize from '../../loaders/database';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  speaker_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Speakers',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'speaker_id',
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'user_id',
  },
  speaker_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emails_sent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  time_slot: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default Booking;
