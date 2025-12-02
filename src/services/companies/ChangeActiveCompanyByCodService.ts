import knex, { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { FindCompanyService } from './FindCompanyService';

export class ChangeActiveCompanyByCodService{
  private conn: Knex<any, unknown>;

  constructor(){
    this.conn = pgConnection;
  }

  public async execute(cod: number){

    if(!cod) throw new Error('Could not find cod');

    const exist = await this.conn('coalemos.empresas').first('cod', 'is_active').where('cod', cod);
    if(!exist) throw new Error('Company not found');

    await this.conn('coalemos.empresas').where('cod', exist).update('is_active', !exist.is_active);

    const service = new FindCompanyService();
    const output = await service.execute(cod);
    return output;



  }
}