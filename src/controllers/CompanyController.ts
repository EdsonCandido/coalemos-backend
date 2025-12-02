import {Request, Response} from 'express';
import logger from '../middlewares/logger';
import { FindCompanyService } from '../services/companies/FindCompanyService';
import { StoreCompanyService } from '../services/companies/StoreCompanyService';
import { ChangeActiveCompanyByCodService } from '../services/companies/ChangeActiveCompanyByCodService';

export class CompanyController{
    public async find(req: Request, res: Response){
        try{
            const cod = req.query?.cod;
            const service = new FindCompanyService();
            const output = await service.execute(Number(cod));
            return res.status(200).json(output);
        }catch(err){
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }
    public async store(req: Request, res: Response){
      try {
        const {cod, cep, bairro, cidade, cnpj, uf, endereco, nome_fantasia, razao_social} = req.body;
        const service = new StoreCompanyService();
        const output = await  service.execute({cod,cep, bairro, cidade, cnpj, uf, endereco, nome_fantasia, razao_social});
        return res.status(200).json(output);
      }catch (e) {
        logger.error(e);
        return res.status(400).send((e as Error).message);
      }
    }
    public async changeActive(req: Request, res: Response){
      try{
        const cod = req.query?.cod;
        const service = new ChangeActiveCompanyByCodService();
        const output = await service.execute(Number(cod));
        return res.status(200).json(output);
      }catch (e) {
        logger.error(e);
        return res.status(400).send((e as Error).message);
      }
    }
}