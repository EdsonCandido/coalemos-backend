import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindCompanyService{
     private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }
  
  public async execute(cod: number){
      
      const query = this.conn('coalemos.empresas')
      .select(
  'cod',
  'cnpj',
  'nome_fantasia',
  'razao_social',
  'cep',
  'endereco',
  'cidade',
  'bairro',
  'uf',
  'is_ativo',
  'created_at',
  'updated_at',
);
      
      if(cod) query.where('cod', cod).firs();
      
      const result = await query;
      
      return result;
      
  }
}