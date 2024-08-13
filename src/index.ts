import express from 'express';
import config from './config/config';
import sequelize from './loaders/database';
import Loaders from './loaders/express';

async function startServer() {
  const app: express.Application = express();
  Loaders({ app });

  // Define relations here for ORM

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
