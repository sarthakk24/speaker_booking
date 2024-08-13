require("dotenv").config();

export default {
  baseurl: process.env.BASE_URL || `http://localhost:${process.env.PORT}`,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  DB_USER: process.env.DB_USER || "test",
  DB_PASSWORD: process.env.DB_PASSWORD || "test",
  DB_HOST: process.env.DB_HOST || "test",
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  DB_DATABASE: process.env.DB_DATABASE || "test",
  api: {
    prefix: "/api",
  },
  jwtSecret: process.env.JWT_SECRET || "testjwt",
};
