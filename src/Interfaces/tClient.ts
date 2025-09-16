export type tClient = {
  cod?: string;
  nome: string;
  cpf_cnpj: string;
  telefone?: string;
  email?: string;
  cep?: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type tArquivoCliente = {
  cod?: string;
  cod_cliente: number;
  nome_original: string;
  tipo: string;
  descricao?: string;
  arquivo: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};
