import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '../middlewares/logger';

let io: Server;

export function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    logger.info('Socket conectado:', socket.id);

    socket.on('disconnect', () => {
      logger.info('Socket desconectado:', socket.id);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    logger.error('Socket.io nao inicializado');
    throw new Error('Socket.io não inicializado');
  }
  return io;
}
