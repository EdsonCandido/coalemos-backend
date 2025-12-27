import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindCidadeByClientService {
  private conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }

  async execute(uf?: Array<string>) {
    const query = this.conn('coalemos.clientes')
      .select('cidade', 'estado')
      .groupBy('cidade')
      .orderBy('cidade', 'asc');

    if (uf && uf.length > 0) query.whereIn('estado', uf);

    const result = await query;
    return result;
  }
}
