drop schema api cascade;

create schema api;

CREATE TABLE api.usuarios(
	cod SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	cpf varchar(11) DEFAULT NULL,
	login VARCHAR(100) NOT NULL UNIQUE,
	senha varchar(255) DEFAULT NULL,
	foto_perfil TEXT DEFAULT NULL,
	is_primeiro_acesso boolean DEFAULT true,
	is_admin boolean DEFAULT false,
	is_ativo boolean DEFAULT true,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT NULL
);

create table api.clientes();


/**
* Insert iniciais
*/

INSERT INTO api.usuarios 
(nome, cpf, login, senha, is_primeiro_acesso, is_admin, is_ativo, created_at) 
VALUES('Suporte', '07907907907', 'suporte@zuko.com', 
'$2a$08$0wtNVjnFrsd/XeI/N6qN8Oc.JH.skwdIakx57oDgdOoRLAPcf42Sq', true, true, true, now());