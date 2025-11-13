import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';
import { FindBannerService } from './FindBannerService';
import { randomUUID } from '../../helpers/randomUUID';

type tInput = {
  cod?: number;
  descricao: string;
  arquivo?: Express.Multer.File;
  nome_arquivo?: string;
  data_vigencia_inicial: string;
  data_vigencia_final: string;
  created_at?: string;
  cod_usuario_criacao?: number;
  updated_at?: string;
  cod_usuario_updated?: number;
};

export class StoreBannerService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(parans: tInput) {
    const hoje = dtHoje();

    const insert: tInput = {
      cod: parans.cod,
      descricao: parans.descricao,
      data_vigencia_inicial: parans.data_vigencia_inicial,
      data_vigencia_final: parans.data_vigencia_final,
      created_at: hoje,
      cod_usuario_criacao: parans?.cod_usuario_criacao,
      updated_at: hoje,
      cod_usuario_updated: parans?.cod_usuario_criacao,
    };

    const query = this.conn('coalemos.banners');
    console.log('parans.cod', parans.cod);
    if (parans.cod) {
      delete insert.cod;
      delete insert.created_at;
      delete insert.cod_usuario_criacao;

      if (parans.arquivo)
        await query.where('cod', parans.cod).update({
          nome_arquivo: `${randomUUID()}-${parans.arquivo.originalname}`,
          arquivo: parans.arquivo.buffer,
          ...insert,
        });
      else await query.where('cod', parans.cod).update(insert);
    } else {
      delete insert.cod;
      delete insert.cod_usuario_updated;
      delete insert.updated_at;

      console.log({
        nome_arquivo: `${randomUUID()}-${parans?.arquivo?.originalname}`,
        arquivo: parans.arquivo?.buffer,
        ...insert,
      });

      const [result] = await query
        .insert({
          nome_arquivo: `${randomUUID()}-${parans?.arquivo?.originalname}`,
          arquivo: parans.arquivo?.buffer,
          ...insert,
        })
        .returning('cod');
      parans.cod = result.cod;
    }

    const service = new FindBannerService();
    const output = await service.execute(parans.cod);
    return output;
  }
}
