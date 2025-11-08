import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindUserByCodService {
  private conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }
  async execute(cod?: number) {
    const query = this.conn('coalemos.usuarios')
      .select(
        'cod',
        'nome',
        'cpf',
        'login',
        'foto_perfil',
        'is_primeiro_acesso',
        'is_admin',
        'is_ativo',
        'created_at',
        'updated_at',
      )
      .orderBy('cod', 'desc');

    if (cod) query.where('cod', cod).first();

    const result = await query;

    return result;
  }
}
