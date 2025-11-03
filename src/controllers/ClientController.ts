import { Request, Response } from 'express';
import { FindClientService } from '../services/clients/FindClientService';
import logger from '../middlewares/logger';
import { StoreClientService } from '../services/clients/StoreClientService';
import { FindFilesForClientService } from '../services/clients/FindFilesForClientService';
import { StoreFilesForClientService } from '../services/clients/StoreFilesForClientService';

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
        cpf_cnpj,
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
        cpf_cnpj,
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
      const output = await service.execute({ cod: Number(cod) });
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async storeFile(req: Request, res: Response): Promise<Response> {
    try {
      const { cod_cliente, infoFiles } = req.body;
      const files = req.files;

      // {
      //   fieldname: 'files',
      //      originalname: 'angular.png',
      //      encoding: '7bit',
      //      mimetype: 'image/png',
      //      buffer:
      // }

      const service = new StoreFilesForClientService();
      const output = await service.execute({
        cod_cliente,
        files: files as any,
        infoFiles,
      });
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).json((err as Error).message);
    }
  }
}
