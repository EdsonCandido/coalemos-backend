import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

import { dtHoje } from '../../helpers/time';
import {
  StatusParcela,
  tStatusParcela,
  tTipoConta,
} from '../../Interfaces/tFinancial';
import { FindFinancialService } from './FindFinancialService';
import logger from '../../middlewares/logger';

type Parcela = {
  cod?: number;
  valor_original: number;
  valor_pago: number;
  desconto?: number;
  acrescimo?: number;
  data_vencimento: string;
  data_pagamento?: string | null;
};

type Parans = {
  cod?: number;
  cod_cliente: number;
  tipo_conta: tTipoConta;
  titulo: string;
  descricao: string;
  parcelas: Parcela[];
  cod_usuario_criacao: number;
  cod_usuario_updated: number;
};

export class StoreFinancialService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(input: Parans) {
    if (!input.cod_cliente) throw new Error('Cliente não informado');
    if (!input.tipo_conta) throw new Error('Tipo de conta não informado');
    if (!input.titulo) throw new Error('Título é obrigatório');

    const created_at = dtHoje();
    const updated_at = dtHoje();

    let valor_bruto = 0;
    let valor_desconto = 0;
    let valor_acrescimo = 0;
    let valor_liquido = 0;

    for (const p of input.parcelas) {
      valor_bruto += p.valor_original || 0;
      valor_desconto += p.desconto || 0;
      valor_acrescimo += p.acrescimo || 0;
      valor_liquido +=
        p.valor_original - (p.desconto || 0) + (p.acrescimo || 0);
    }

    const is_parcela = input.parcelas.length > 1;

    const trx = await this.conn.transaction();

    let cod_financeiro: number;

    try {
      if (input.cod) {
        await trx('coalemos.financeiro')
          .update({
            cod_cliente: input.cod_cliente,
            tipo_conta: input.tipo_conta,
            titulo: input.titulo,
            descricao: input.descricao,
            valor_bruto,
            valor_desconto,
            valor_acrescimo,
            valor_liquido,
            is_parcela,
            is_ativo: true,
            updated_at,
            cod_usuario_updated: input.cod_usuario_updated,
          })
          .where({ cod: input.cod });

        cod_financeiro = input.cod;
      } else {
        const [novo] = await trx('coalemos.financeiro')
          .insert({
            cod_cliente: input.cod_cliente,
            tipo_conta: input.tipo_conta,
            titulo: input.titulo,
            descricao: input.descricao,
            valor_bruto,
            valor_desconto,
            valor_acrescimo,
            valor_liquido,
            is_parcela,
            is_ativo: true,
            created_at,
            cod_usuario_criacao: input.cod_usuario_criacao,
          })
          .returning('cod');

        cod_financeiro = novo.cod;
      }

      const parcelasExistentes = await trx(
        'coalemos.financeiro_parcelas',
      ).where({
        cod_financeiro,
        is_ativo: true,
      });

      const idsExistentes = parcelasExistentes.map((p) => p.cod);

      for (let i = 0; i < input.parcelas.length; i++) {
        const p = input.parcelas[i];

        const status: tStatusParcela = p.data_pagamento
          ? StatusParcela.pago
          : StatusParcela.pendente;

        const data = {
          cod_financeiro,
          numero_parcela: i + 1,
          data_vencimento: p.data_vencimento,
          data_emissao: created_at,
          valor_original: p.valor_original,
          valor_pago: p.valor_pago,
          desconto: p.desconto,
          acrescimo: p.acrescimo,
          status,
          data_pagamento: p.data_pagamento || null,
          is_ativo: true,
        };

        if (p.cod && idsExistentes.includes(p.cod)) {
          await trx('coalemos.financeiro_parcelas')
            .where({ cod: p.cod })
            .update({
              ...data,
              updated_at,
              cod_usuario_updated: input.cod_usuario_updated,
            });
        } else {
          await trx('coalemos.financeiro_parcelas').insert({
            ...data,
            created_at,
            cod_usuario_criacao: input.cod_usuario_criacao,
          });
        }
      }

      const idsAtuais = input.parcelas.filter((p) => p.cod).map((p) => p.cod);
      const inativos = idsExistentes.filter((id) => !idsAtuais.includes(id));

      if (inativos.length > 0) {
        await trx('coalemos.financeiro_parcelas')
          .whereIn('cod', inativos)
          .update({
            is_ativo: false,
            updated_at,
            cod_usuario_updated: input.cod_usuario_updated,
          });
      }
      await trx.commit();

      const service = new FindFinancialService();
      const output = await service.execute(cod_financeiro);
      return output;
    } catch (err) {
      await trx.rollback();
      logger.error(err);
      console.error('Erro ao salvar financeiro:', err);
      throw new Error('Erro ao salvar dados financeiros');
    }
  }
}
