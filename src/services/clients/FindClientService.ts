import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindClientService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(cod?: number) {
    const query = this.conn('coalemos.clientes').select(
      'cod',
      'nome',
      'cpf_cnpj',
      'email',
      'telefone',
      'logradouro',
      'bairro',
      'cep',
      'cidade',
      'complemento',
      'estado',
      'numero',
      'is_ativo',
      'created_at',
      'updated_at',
    );

    if (cod) query.where({ cod }).first();

    const client = await query;

    if (!client) throw new Error('Cliente não encontrado.');

    return client;
  }
}
