import { Knex } from 'knex';
import logger from './middlewares/logger';
import { StoreUserService } from './services/users/StoreUserService';
import { log } from 'winston';

export class SeedsService {
  public async execute() {
    this.verificaUsuarioPadrao();
  }
  private async verificaUsuarioPadrao() {
    logger.info('Verificando usuário inicial');
    const usuario = {
      cpf: '30557812011',
      login: 'suporte@admin.com',
      nome: 'Edson',
      senha: '123456',
      is_admin: true,
      is_primeiro_acesso: true,
    };
    const service = new StoreUserService();

    try {
      await service.execute(usuario);
    } catch (err) {
      const message = (err as Error).message;

      if (message == 'Usuário já cadastrado')
        logger.info((err as Error).message);
      else logger.error((err as Error).message);
    }
  }

  private async verificaClientePadrao() {
    try {
    } catch (err) {
      logger.info('Cliente já cadastrado');
    }
  }
}
