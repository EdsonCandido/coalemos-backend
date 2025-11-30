import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { FindCompanyService } from './FindCompanyService';
import {
  manterApenasNumeros,
  removerCaracteresEspeciais,
} from '../../helpers/format';
import { dtHoje } from '../../helpers/time';

type tInput = {
  cod?: number;
  cnpj: string;
  nome_fantasia: string;
  razao_social: string;
  cep?: string;
  endereco?: string;
  cidade?: string;
  bairro?: string;
  uf?: string;
  created_at?: string;
  updated_at?: string;
};
export class StoreCompanyService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(input: tInput) {
    const hoje = dtHoje();
    const insert: tInput = {
      cnpj: removerCaracteresEspeciais(input.cnpj),
      nome_fantasia: input.nome_fantasia,
      razao_social: input.razao_social,
      cep: manterApenasNumeros(`${input.cep}`),
      endereco: input.endereco,
      cidade: input.cidade,
      bairro: input.bairro,
      uf: input.uf,
      created_at: hoje,
      updated_at: hoje,
    };

    const query = this.conn(' coalemos.empresas');
    if (input.cod) {
      delete insert.cod;
      delete insert.created_at;

      await query.where('cod', input.cod).update(insert);
    } else {
      delete insert.cod;
      delete insert.updated_at;

      const [result] = await query.insert(insert).returning('cod');
      input.cod = result.cod;
    }

    const service = new FindCompanyService();
    const output = await service.execute(Number(input.cod));
    return output;
  }
}
