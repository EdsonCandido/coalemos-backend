import { Knex } from "knex";
import pgConnection from "../../databases/pgConnection";
import { string } from "zod";
import { FindUserByCodService } from "./FindUserByCodService";
import { dtHoje } from "../../helpers/time";
import { hash } from "bcryptjs";

type tProps = {
    cod?: number;
    nome: string;
    cpf: string;
    login: string;
    senha?: string;
    is_primeiro_acesso?: boolean;
    is_admin?: boolean;
    is_ativo?: boolean;
    created_at?: string,
    updated_at?: string,
}
export class StoreUserService {
    private conn: Knex<any, unknown>
    constructor() {
        this.conn = pgConnection;
    }

    public async execute({ cpf, login, nome, cod, is_admin = false, is_ativo = true,
        is_primeiro_acesso = true, senha, }: tProps) {

        const hoje = dtHoje();
        const payload: tProps = {
            cod: cod,
            nome: nome,
            cpf: cpf,
            login: login,
            is_primeiro_acesso: is_primeiro_acesso,
            is_admin: is_admin,
            is_ativo: is_ativo,
            created_at: hoje,
            updated_at: hoje,
        }

        if (senha) {
            payload.senha = await hash(senha, 10);
        }

        if (cod) {
            delete payload.cod;
            delete payload.created_at;

            await this.conn('coalemos.usuarios')
                .where({ cod: cod })
                .update(payload);
        } else {
            delete payload.cod;
            delete payload.updated_at;

            const [insert] = await this.conn('coalemos.usuarios')
                .insert(payload).returning('cod');
            cod = insert
        }

        const service = new FindUserByCodService();
        const result = await service.execute(Number(cod));
        return result;

    }
}