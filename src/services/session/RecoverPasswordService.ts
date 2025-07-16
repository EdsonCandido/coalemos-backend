import { Knex } from "knex";
import pgConnection from "../../databases/pgConnection";

export class RecoverPasswordService{
    private conn: Knex<any, unknown>
    constructor() {
        this.conn = pgConnection;
    }
    public async execute({login, email}: {login: string, email: string}) {

    }
}