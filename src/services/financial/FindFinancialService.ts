import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindFinancialService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(cod?: number) {
    const query = this.conn('coalemos.financeiro')
      .select(
        'financeiro.cod',
        'financeiro.cod_cliente',
        'financeiro.tipo_conta',
        'financeiro.titulo',
        'financeiro.descricao',
        'financeiro.valor_bruto',
        'financeiro.valor_desconto',
        'financeiro.valor_acrescimo',
        'financeiro.valor_liquido',
        'financeiro.is_parcela',
        'financeiro.is_ativo',
        'financeiro.created_at',
        'financeiro.cod_usuario_criacao',
        'financeiro.updated_at',
        'financeiro.cod_usuario_updated',

        'a2.nome as nome_usuario_updated',
        'a1.nome as nome_usuario_criacao',

        'clientes.nome as nome_cliente',
      )
      .leftJoin(
        'coalemos.usuarios as a1',
        'a1.cod',
        'financeiro.cod_usuario_criacao',
      )
      .leftJoin(
        'coalemos.usuarios as a2',
        'a2.cod',
        'financeiro.cod_usuario_updated',
      )
      .leftJoin(
        'coalemos.clientes as clientes',
        'clientes.nome',
        'financeiro.cod_cliente',
      );

    if (cod) query.where('financeiro.cod', cod).first();

    const result = await query;

    return result;
  }
}
