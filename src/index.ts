import express from 'express';
import config from './config/config';
import sequelize from './loaders/database';
import Loaders from './loaders/express';
import User from './models/sql/user';
import Expert from './models/sql/expertise';
import Booking from './models/sql/booking';

async function startServer() {
  const app: express.Application = express();
  Loaders({ app });

  // Define relations here for ORM

  User.hasMany(Expert, {
    foreignKey: 'speaker_id',
    as: 'expertiseAreas',
  });

  Expert.belongsTo(User, {
    foreignKey: 'speaker_id',
    as: 'speaker',
  });

  User.hasMany(Booking, {
    foreignKey: 'speaker_id',
    as: 'speakerBookings',
  });

  Booking.belongsTo(User, {
    foreignKey: 'speaker_id',
    as: 'speaker',
  });

  User.hasMany(Booking, {
    foreignKey: 'user_id',
    as: 'userBookings',
  });

  Booking.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user', // Alias for the user relationship
  });

  await sequelize.sync();
  app
    .listen(config.port, () => {
      console.log(`🛡️  Server listening on port: ${config.port}`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
