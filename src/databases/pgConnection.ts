import knex from "knex";
import env from "../configs/env";
/**
 * Configuração da conexão com o banco de dados PostgreSQL usando Knex.js.
 *
 * @module pgConnection
 */
const pgConnection = knex({
  client: env.DATABASE_CLIENT,
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
});

export default pgConnection;
