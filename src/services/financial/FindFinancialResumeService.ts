import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

class FindFinancialResumeService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }
}
