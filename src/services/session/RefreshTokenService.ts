import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { sign, verify } from 'jsonwebtoken';
import env from '../../configs/env';

export class RefreshTokenService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(refreshToken: string) {
    if (!refreshToken) throw new Error('Dados imcompletos');

    const existUser = await this.conn('coalemos.usuarios')
      .where('refresh_token', refreshToken)
      .first('refresh_token');

    if (!existUser) throw new Error('Refresh Token inválido');

    const decoded = verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    const { cod_usuario, exp } = decoded as {
      cod_usuario: number;
      exp: number;
    };
    const dateNow = Math.floor(Date.now() / 1000);

    if (exp < dateNow) throw new Error('Sessão expirada');

    let payload = { cod_usuario: cod_usuario };

    const accessToken = sign(payload, env.ACCESS_TOKEN_SECRET, {
      subject: String(cod_usuario),
      expiresIn: `${env.ACCESS_TOKEN_EXPIRATION}s`,
    });

    const newRefreshToken = sign(payload, env.REFRESH_TOKEN_SECRET, {
      subject: String(cod_usuario),
      expiresIn: String(`${env.REFRESH_TOKEN_EXPIRATION}s`),
    });

    await this.conn('coalemos.usuarios')
      .update('refresh_token', newRefreshToken)
      .where('cod', cod_usuario);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
