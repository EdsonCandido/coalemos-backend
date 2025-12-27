import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindUFByClientService {
  private conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }

  async execute() {
    return await this.conn('coalemos.clientes')
      .select('estado')
      .groupBy('estado')
      .orderBy('estado', 'asc');
  }
}
