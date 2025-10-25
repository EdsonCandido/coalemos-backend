export const TipoConta = {
  pagar: 'pagar',
  receber: 'receber',
} as const;

export const StatusParcela = {
  pendente: 'pendente',
  pago: 'pago',
  cancelado: 'cancelado',
  atrasado: 'atrasado',
} as const;

export type tTipoConta = (typeof TipoConta)[keyof typeof TipoConta];
export type tStatusParcela = (typeof StatusParcela)[keyof typeof StatusParcela];

export type tFinanceiro = {
  cod?: number;
  cod_cliente: number;
  tipo_conta: tTipoConta;
  titulo: string;
  descricao: string;
  valor_bruto: number;
  valor_desconto: number;
  valor_acrescimo: number;
  valor_liquido: number;
  is_parcela: boolean;
  is_ativo: boolean;
  cod_usuario_criacao: number;
  cod_usuario_updated: number;
  created_at?: string;
  updated_at?: string;
};

export type tParcelas = {
  cod?: number;
  cod_financeiro: number;
  numero_parcela: number;
  data_vencimento: string;
  data_emissao: string;
  valor_original: number;
  valor_pago: number;
  desconto: number;
  acrescimo: number;
  status: tStatusParcela;
  data_pagamento?: string | null;
  is_ativo: boolean;
  created_at?: string;
  cod_usuario_criacao: number;
  updated_at?: string;
  cod_usuario_updated?: number;
};
