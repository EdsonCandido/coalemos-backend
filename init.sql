drop schema if exists coalemos cascade;

create schema coalemos;

CREATE TABLE coalemos.usuarios(
	cod SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	cpf_cnpj varchar(14) DEFAULT NULL,
	login VARCHAR(100) NOT NULL UNIQUE,
	senha varchar(255) DEFAULT NULL,
	foto_perfil TEXT DEFAULT NULL,
	is_primeiro_acesso boolean DEFAULT true,
	is_admin boolean DEFAULT false,
	is_ativo boolean DEFAULT true,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT NULL
);

create table coalemos.clientes(
	cod SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	cpf varchar(11) DEFAULT NULL,
	telefone varchar(15) DEFAULT NULL,
	email VARCHAR(100) DEFAULT NULL,
	cep varchar(8) DEFAULT NULL,
	logradouro VARCHAR(255) DEFAULT NULL,
	numero VARCHAR(10) DEFAULT NULL,
	complemento VARCHAR(255) DEFAULT NULL,
	bairro VARCHAR(100) DEFAULT NULL,
	cidade VARCHAR(100) DEFAULT NULL,
	estado VARCHAR(2) DEFAULT NULL,
	is_ativo boolean DEFAULT true,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT NULL
);

create table coalemos.documentos_cliente(
    cod SERIAL PRIMARY KEY,
    cod_cliente int not null,
    nome_original varchar(255) not null,
    tipo varchar(10) not null,
    descricao varchar(255) default null,
    arquivo TEXT not null,
    is_ativo boolean DEFAULT true,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT NULL
);


/**
* Insert iniciais
*/

INSERT INTO coalemos.usuarios
(nome, cpf, login, senha, is_primeiro_acesso, is_admin, is_ativo, created_at)
VALUES('Suporte', '07907907907', 'suporte@zuko.com',
'$2a$08$0wtNVjnFrsd/XeI/N6qN8Oc.JH.skwdIakx57oDgdOoRLAPcf42Sq', true, true, true, now());
