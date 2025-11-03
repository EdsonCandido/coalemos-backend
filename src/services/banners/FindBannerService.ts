import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindBannerService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(cod?: number) {
    const query = this.conn('coalemos.banners')
      .select(
        'banners.cod',
        'banners.descricao',
        'banners.arquivo',
        'banners.nome_arquivo',
        'banners.data_vigencia_inicial',
        'banners.data_vigencia_final',
        'banners.is_ativo',
        'banners.created_at',
        'banners.cod_usuario_criacao',
        'banners.updated_at',
        'banners.cod_usuario_updated',

        'a2.nome as nome_usuario_updated',
        'a1.nome as nome_usuario_criacao',
      )
      .leftJoin(
        'coalemos.usuarios as a1',
        'a1.cod',
        'banners.cod_usuario_criacao',
      )
      .leftJoin(
        'coalemos.usuarios as a2',
        'a2.cod',
        'banners.cod_usuario_updated',
      )
      .orderBy('banners.cod', 'desc');

    if (cod) query.where('banners.cod', cod).first();

    const result = await query;
    let convertResult = null;
    if (cod) {
      convertResult = {
        ...result,
        arquivo: `data:image/png;base64,${(result as any).arquivo.toString('base64')}`,
      };
    } else {
      convertResult = result.map((i) => ({
        ...i,
        arquivo: `data:image/png;base64,${i.arquivo.toString('base64')}`,
      }));
    }
    return convertResult;
  }
}
