import { Request, Response } from 'express';
import { FindClientService } from '../services/client/FindClientService';
import logger from '../middlewares/logger';
import { StoreClientService } from '../services/client/StoreClientService';
import { FindFilesForClientService } from '../services/client/FindFilesForClientService';

export class ClientController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const { cod } = req.params;
      const service = new FindClientService();
      const output = await service.execute(Number(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const {
        cpf,
        logradouro,
        nome,
        bairro,
        cep,
        cidade,
        complemento,
        estado,
        email,
        numero,
        telefone,
        cod,
      } = req.body;
      const service = new StoreClientService();
      const output = await service.execute({
        cpf,
        logradouro,
        nome,
        bairro,
        cep,
        cidade,
        complemento,
        estado,
        email,
        numero,
        telefone,
        cod,
      });
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async findFiles(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.query?.cod;
      const service = new FindFilesForClientService();
      const output = await service.execute(Number(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async storeFile(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.query?.cod;

      // const {} = req.body;
      const files = req.files;
      console.log('files', files);
      
      { 
        fieldname: 'files',
           originalname: 'angular.png',
           encoding: '7bit',
           mimetype: 'image/png',
           buffer: 
      }

      const service = {};
      const output = {};
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).json((err as Error).message);
    }
  }
}
