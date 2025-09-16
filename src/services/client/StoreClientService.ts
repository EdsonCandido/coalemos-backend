import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { tClient } from '../../Interfaces/tClient';
import { dtHoje } from '../../helpers/time';
import { FindClientService } from './FindClientService';
import { manterApenasNumeros } from '../../helpers/format';

type Props = tClient;

export class StoreClientService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute({
    cpf_cnpj,
    logradouro,
    nome,
    bairro,
    cep,
    complemento,
    email,
    telefone,
    numero,
    cidade,
    cod,
    estado,
  }: Props) {
    const created_at = dtHoje();
    const payload: Props = {
      nome,
      cpf_cnpj: manterApenasNumeros(cpf_cnpj),
      email,
      telefone,
      logradouro,
      bairro,
      cep,
      cidade,
      complemento,
      estado,
      numero,
      created_at: created_at,
      updated_at: created_at,
    };

    if (cod) {
      delete payload.cod;
      delete payload.created_at;

      await this.conn('coalemos.clientes').update(payload).where({ cod });
    } else {
      delete payload.cod;
      delete payload.updated_at;

      const [insert] = await this.conn('coalemos.clientes')
        .insert(payload)
        .returning('cod');

      cod = insert.cod;
    }

    const service = new FindClientService();
    const result = await service.execute(Number(cod));
    return result;
  }
}
