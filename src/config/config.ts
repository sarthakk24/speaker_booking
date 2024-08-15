require('dotenv').config();

export default {
  baseurl: process.env.BASE_URL ?? `http://localhost:${process.env.PORT}`,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  DB_USER: process.env.DB_USER ?? 'test',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'test',
  DB_HOST: process.env.DB_HOST ?? 'test',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  DB_DATABASE: process.env.DB_DATABASE ?? 'test',
  api: {
    prefix: '/api',
  },
  jwtSecret: process.env.JWT_SECRET ?? 'testjwt',
  region: process.env.AWS_DEFAULT_REGION ?? 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'test',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'test',
  from: process.env.EMAIL_FROM ?? 'sarthak.sachdeva.73@gmail.com',
  replyTo: process.env.EMAIL_REPLY_TO ?? 'sarthak.sachdeva.73@gmail.com',
};
