import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';

export class FindBannerCurrentService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute() {
    const query = this.conn('coalemos.banners')
      .select(
        'banners.cod',
        'banners.arquivo',
        'banners.nome_arquivo',
        'banners.descricao',
      )
      .where('banners.is_ativo', true)
      .whereRaw(
        `'${dtHoje('yyyy-MM-dd')}' BETWEEN banners.data_vigencia_inicial::DATE AND banners.data_vigencia_final::DATE`,
      )
      .orderBy('banners.cod', 'desc');

    const result = await query;

    const formater = result.map((j) => ({
      ...j,
      arquivo: `data:image/png;base64,${j.arquivo.toString('base64')}`,
    }));

    return formater;
  }
}
