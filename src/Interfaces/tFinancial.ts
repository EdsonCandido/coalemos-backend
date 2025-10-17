export type tTipoConta = {
  pagar: 'pagar';
  receber: 'receber';
};
export type tStatusParcela = {
  pendente: 'pendente';
  pago: 'pago';
  cancelado: 'cancelado';
  atrasado: 'atrasado';
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
  status: string;
  data_pagamento: string;
  is_ativo?: boolean;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;
};
