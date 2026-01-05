import { createServer } from 'http';
import app from './app';
import env from './configs/env';
import logger from './middlewares/logger';
import { SeedsService } from './seeds';
import { initSocket } from './socket';

const APP_PORT = env.APP_PORT || 3333;

enum ExitStatus {
  falha = 1,
  sucesso = 0,
}

const seedService = new SeedsService();
seedService.execute().then();

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(APP_PORT, () => {
  logger.info(`Servidor inicializado na porta ${APP_PORT}`);

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        logger.info('Servidor desligado com sucesso.');
        process.exit(ExitStatus.sucesso);
      } catch (error) {
        logger.error(`Erro ao finalizar o servidor: ${error}`);
        process.exit(ExitStatus.falha);
      }
    });
  });
});
