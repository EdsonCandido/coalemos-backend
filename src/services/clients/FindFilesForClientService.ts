import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { tArquivoCliente } from '../../Interfaces/tClient';

export class FindFilesForClientService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute({
    cod,
    cod_cliente,
  }: {
    cod?: number;
    cod_cliente?: number;
  }): Promise<tArquivoCliente | tArquivoCliente[]> {
    const query = this.conn('coalemos.documentos_cliente').select(
      'cod',
      'cod_cliente',
      'nome_original',
      'tipo',
      'descricao',
      'arquivo',
      'is_ativo',
      'created_at',
      'updated_at',
    );

    if (cod) query.where('cod', cod).first();
    if (cod_cliente) query.where('cod_cliente', cod_cliente);

    const result = await query;

    return result;
  }
}
