import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { FindFilesForClientService } from './FindFilesForClientService';
import { dtHoje } from '../../helpers/time';

type tProps = {
  cod_cliente: number;
  infoFiles: Array<{
    cod?: string;
    nome_original: string;
    tipo: string;
    descricao: string;
  }>;
  files: Array<Express.Multer.File>;
};

type tInsert = {
  cod_cliente: number;
  nome_original: string;
  tipo: string;
  descricao: string;
  arquivo: string;
  created_at?: string;
  updated_at?: string;
};

export class StoreFilesForClientService {
  private conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(props: tProps) {
    if (props.infoFiles.length === 0 || props.files.length === 0)
      throw new Error('Não há informações de arquivos');

    if (!props.cod_cliente) throw new Error('Código do cliente inválido');

    const clientExist = await this.conn('coalemos.clientes')
      .where('cod', props.cod_cliente)
      .first('cod');

    if (!clientExist) throw new Error('Cliente não encontrado');
    for (let i = 0; i < props.infoFiles.length; i++) {
      const infoFiles = props.infoFiles[i];
      const arquivo = props?.files[i];

      const created_at = dtHoje();
      const insert: tInsert = {
        cod_cliente: props.cod_cliente,
        nome_original: infoFiles.nome_original,
        tipo: infoFiles.tipo,
        descricao: infoFiles.descricao,
        arquivo: arquivo.buffer.toString('base64'),
        created_at: created_at,
        updated_at: created_at,
      };

      const query = this.conn('documentos_cliente');
      if (infoFiles.cod) {
        delete insert.created_at;
        await query.update(insert).where('cod', infoFiles.cod);
      } else {
        delete insert.updated_at;
        await query.insert(insert);
      }
    }

    const service = new FindFilesForClientService();
    const output = await service.execute({ cod_cliente: props.cod_cliente });
    return output;
  }
}
