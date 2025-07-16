import { Knex } from "knex";
import pgConnection from "../../databases/pgConnection";

export class FindUserByCodService {
    private conn: Knex<any, unknown>
    constructor() {
        this.conn = pgConnection;
    }
    async execute(cod: number) {
        return this.conn('coalemos.usuarios')
            .where({ cod })
            .first(
                'cod',
                'nome',
                'cpf',
                'login',
                'foto_perfil',
                'is_primeiro_acesso',
                'is_admin',
                'is_ativo',
                'created_at',
                'updated_at'
            );
    }
}