import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { tTipoConta } from '../../Interfaces/tFinancial';
import { dtHoje } from '../../helpers/time';

type Parans = {
  cod?: number;
  cod_cliente: number;
  tipo_conta: tTipoConta;
  titulo: string;
  descricao: string;
  is_parcela: boolean;

  valor_liquido?: number;
  valor_acrescimo?: number;
  valor_bruto?: number;
  valor_desconto?: number;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;

  parcelas: [
    {
      valor_parcela: number;
      data_vencimento: string;
      desconto?: number;
      acrescimo?: number;
      data_pagamento?: string;
    },
  ];
};

export class StoreFincancialService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(input: Parans) {
    if (!input.cod_cliente) throw new Error('Dados incompletos');

    let valor_bruto: number = 0;
    let valor_desconto: number = 0;
    let valor_acrescimo: number = 0;
    let valor_liquido: number = 0;

    const created_at = dtHoje();
    let insert_header: Parans = {
      ...input,
      valor_liquido,
      valor_acrescimo,
      valor_bruto,
      valor_desconto,
      created_at: created_at,
      updated_at: created_at,
    };

    const query_financeiro = this.conn('coalemos.financeiro');
    const query_financial_parcelas = this.conn('coalemos.financeiro_parcelas');

    if (input.cod) {
      delete insert_header.created_at;
      delete insert_header.cod_usuario_criacao;
    } else {
      delete insert_header.updated_at;
      delete insert_header.cod_usuario_updated;

      for (let i = 0; i <= input.parcelas.length; i++) {}
    }
  }
}
