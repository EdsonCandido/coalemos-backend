import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { compare } from 'bcryptjs';
import env from '../../configs/env';
import { sign } from 'jsonwebtoken';

export class LoginService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(login: string, password: string) {
    if (!login || !password) throw new Error('Login ou senha inválidos. ');

    const usuario = await this.conn('coalemos.usuarios')
      .where({ login })
      .first(
        'cod',
        'nome',
        'login',
        'senha',
        'foto_perfil',
        'is_primeiro_acesso',
        'perfil',
        'is_ativo',
      );

    if (!usuario) throw new Error('Login ou senha inválidos.');

    if (!usuario.is_ativo) throw new Error('Usuário inativo.');

    const passwordMatch = await compare(password, usuario.senha);

    if (!passwordMatch) throw new Error('Login ou senha inválidos.');

    delete usuario.senha;

    let payload = { cod_usuario: usuario.cod, perfil: usuario.perfil };

    const accessToken = sign(payload, env.ACCESS_TOKEN_SECRET, {
      subject: usuario.cod.toString(),
      expiresIn: env.ACCESS_TOKEN_EXPIRATION
        ? `${env.ACCESS_TOKEN_EXPIRATION}s`
        : '360s',
    });

    const refreshToken = sign(payload, env.REFRESH_TOKEN_SECRET, {
      subject: usuario.cod.toString(),
      expiresIn: env.REFRESH_TOKEN_EXPIRATION
        ? `${env.REFRESH_TOKEN_EXPIRATION}s`
        : '600s',
    });

    const query = this.conn('coalemos.usuarios');

    if (usuario.is_primeiro_acesso)
      query.update({ is_primeiro_acesso: false }).where({ cod: usuario.cod });

    await query.update('refresh_token', refreshToken);

    return { accessToken, refreshToken, usuario };
  }
}
