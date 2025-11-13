import { Request, Response } from 'express';
import { FindBannerService } from '../services/banners/FindBannerService';
import logger from '../middlewares/logger';
import { FindBannerCurrentService } from '../services/banners/FindBannerCurrentService';
import { StoreBannerService } from '../services/banners/StoreBannerService';
import { ChangeActiveBannerByCodService } from '../services/banners/ChangeActiveBannerByCodService';

export class BannerController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.query.cod;
      const service = new FindBannerService();
      const output = await service.execute(Number(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async current(req: Request, res: Response): Promise<Response> {
    try {
      const service = new FindBannerCurrentService();
      const output = await service.execute();
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { data_vigencia_inicial, data_vigencia_final, cod, descricao } =
        req.body;
      const cod_usuario = req.usuario.cod_usuario;
      const arquivo = req.file;
      const service = new StoreBannerService();
      const output = await service.execute({
        data_vigencia_final,
        data_vigencia_inicial,
        descricao,
        arquivo: arquivo as Express.Multer.File,
        cod,
        cod_usuario_criacao: cod_usuario,
        cod_usuario_updated: cod_usuario,
      });
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }
  public async changeActive(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.params.cod;
      const cod_usuario = req.usuario.cod_usuario;
      const service = new ChangeActiveBannerByCodService();
      const output = await service.execute(Number(cod), cod_usuario);
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }
}
