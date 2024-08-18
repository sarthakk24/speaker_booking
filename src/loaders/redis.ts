import { createClient, RedisClientType } from 'redis';
import config from '../config/config';

const client: RedisClientType = createClient({
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Could not connect to Redis:', err);
  }
})();

export default client;
