import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';
import { FindBannerService } from './FindBannerService';

export class ChangeActiveBannerByCodService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(cod: number, cod_usuario_updated: number) {
    if (!cod) throw new Error('Dados incompletos');

    const existBanner = await this.conn('coalemos.banners')
      .first('cod', 'is_ativo')
      .where('cod', cod);

    if (!existBanner) throw new Error('Não encontrado');

    await this.conn('coalemos.banners')
      .update({
        is_ativo: !existBanner.is_ativo,
        updated_at: dtHoje(),
        cod_usuario_updated,
      })
      .where('cod', cod);

    const service = new FindBannerService();
    const output = await service.execute(cod);
    return output;
  }
}
