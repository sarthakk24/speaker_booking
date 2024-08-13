import { Sequelize } from "sequelize";
import config from "../config/config";
console.log("🔶 New Connection to postgres sql was initialized ");

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "postgres",
    port: config.DB_PORT,
    logging: false, // on production logging false
  }
);

export default sequelize;
