import { Knex } from "knex";
import pgConnection from "../../databases/pgConnection";
import { FindUserByCodService } from "./FindUserByCodService";
import { dtHoje } from "../../helpers/time";

export class ChangeActiveUserByCodService {
    private conn: Knex<any, unknown>;

    constructor() {
        this.conn = pgConnection
    }
    public async execute(cod: number) {

        if (!cod) throw new Error("Dados inválidos.");

        await this.conn('coalemos.usuarios').where({ cod })
            .update({ is_ativo: false, updated_at: dtHoje() });

        const service = new FindUserByCodService();
        const result = await service.execute(cod);
        return result;
    }
}