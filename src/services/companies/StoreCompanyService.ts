import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

type tInput = {
    cod?: number,
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    cep?: string,
    endereco?: string,
    cidade?: string,
    bairro?: string,
    uf?: string,
    created_at?: string,
    updated_at?: string,
}
export class StoreCompanyService{
     private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }
  
public async execute(input: tInput){
    
    const insert : tInput = {
        
    }
    
    if(input.cod){
        
    }else{
        delete insert.cod;
        delete insert.updated_at;
        
        const [result] = await query.insert(insert);
        input.cod = result.cod;
        
    }
    
    const service = new FindCompanyService();
    const output = await service.execute(input.cod);
}  
}