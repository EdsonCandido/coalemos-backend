import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class ValidLoginUserService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(login: string) {
    if (!login) throw new Error('Dados incompletos');

    const userExist = await this.conn('coalemos.usuarios')
      .where('login', login)
      .first('cod');

    if (userExist) throw new Error('Usuário Já existe');

    return true;
  }
}
