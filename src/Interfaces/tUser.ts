export type tUser = {
    cod?: number;
	nome?: string;
	cpf?: string;
	login?: string;
	senha?: string;
	foto_perfil?: string;
	is_primeiro_acesso?: boolean
	is_admin?: boolean;
	is_ativo?: boolean;
	created_at?: string
    updated_at?: string
}