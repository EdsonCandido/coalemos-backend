import { Knex } from "knex";
import pgConnection from "../../databases/pgConnection";
import { compare, hash } from "bcryptjs";
import { dtHoje } from "../../helpers/time";
import { FindUserByCodService } from "../user/FindUserByCodService";

type tProps = {
    oldPassword: string,
    newPassword: string,
    cod_usuario: number
}

export class ChangePasswordService {
    private conn: Knex<any, unknown>
    constructor() {
        this.conn = pgConnection;
    }

    public async execute(props: tProps) {
        if (!props.oldPassword || !props.newPassword || !props.cod_usuario)
            throw new Error("Dados inválidos.");

        const existUser = await this.conn('coalemos.usuarios')
            .where({ cod: props.cod_usuario }).first('cod', 'senha');

        if (!existUser) throw new Error("Usuário inexistente.");

        const passwordMatch = await compare(props.oldPassword, existUser.senha);

        if (!passwordMatch) throw new Error("Senha antiga inválida.");

        const passwodHash = await hash(props.newPassword, 10);

        await this.conn('coalemos.usuarios').where({ cod: props.cod_usuario }).update({
            senha: passwodHash,
            updated_at: dtHoje(),
        });

        const service = new FindUserByCodService();
        const result = await service.execute(props.cod_usuario);
        return result;

    }
}