import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindFinancialService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(cod?: number) {
    const query_financeiro = this.conn('coalemos.financeiro')
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
      )
      .where('financeiro.is_ativo', true);

    const query_parcelas = this.conn('coalemos.financeiro_parcelas')
      .where('financeiro_parcelas.is_ativo')
      .select(
        'financeiro_parcelas.cod',
        'financeiro_parcelas.cod_financeiro',
        'financeiro_parcelas.numero_parcela',
        'financeiro_parcelas.data_vencimento',
        'financeiro_parcelas.data_emissao',
        'financeiro_parcelas.valor_original',
        'financeiro_parcelas.valor_pago',
        'financeiro_parcelas.desconto',
        'financeiro_parcelas.acrescimo',
        'financeiro_parcelas.status',
        'financeiro_parcelas.data_pagamento',
        'financeiro_parcelas.is_ativo',
        'financeiro_parcelas.created_at',
        'financeiro_parcelas.cod_usuario_criacao',
        'financeiro_parcelas.updated_at',
        'financeiro_parcelas.cod_usuario_updated',
        'a2.nome as nome_usuario_updated',
        'a1.nome as nome_usuario_criacao',
      )
      .leftJoin(
        'coalemos.usuarios as a1',
        'a1.cod',
        'financeiro_parcelas.cod_usuario_criacao',
      )
      .leftJoin(
        'coalemos.usuarios as a2',
        'a2.cod',
        'financeiro_parcelas.cod_usuario_updated',
      );

    if (cod) {
      query_financeiro.where('financeiro.cod', cod).first();
      query_parcelas.where('financeiro_parcelas.cod_financeiro', cod);
    }

    const financeiro = await query_financeiro;
    const parcelas = await query_parcelas;

    for (let i = 0; i <= financeiro.length; i++)
      financeiro[i].parcelas = parcelas.filter(
        (l) => l.cod_financeiro == financeiro[i].cod,
      );

    return financeiro;
  }
}
