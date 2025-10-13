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
	refresh_token text default null,
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

create table coalemos.financeiro(
    cod SERIAL PRIMARY KEY,
    cod_cliente int default null,
    tipo_conta varchar(7) not null, -- pagar | receber
    titulo TEXT default null,
    descricao TEXT default null,
    valor_bruto decimal(12,2) default 0,
    valor_desconto decimal(12,2) default 0,
    valor_acrescimo decimal(12,2) default 0,
    valor_liquido decimal(12,2) default 0,
    is_parcela boolean DEFAULT false,
    is_ativo boolean DEFAULT true,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    cod_usuario_criacao int not null,
    updated_at timestamp DEFAULT NULL,
    cod_usuario_updated int not null,
    foreign key(cod_cliente) references coalemos.clientes(cod) ,
    foreign key(cod_usuario_criacao) references coalemos.usuarios(cod) ,
    foreign key(cod_usuario_updated) references coalemos.usuarios.(cod)
);

create table coalemos.financeiro_parcelas(
    cod SERIAL PRIMARY KEY,
    cod_financeiro INT NOT NULL,
    numero_parcela INT NOT NULL,
    data_vencimento DATE NOT NULL,
    data_emissao DATE DEFAULT CURRENT_DATE,
    valor_original DECIMAL(12,2) NOT NULL,
    valor_original DECIMAL(12,2) NOT NULL,
    desconto DECIMAL(12,2) DEFAULT 0,
    acrescimo DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, pago, cancelado, atrasado
    data_pagamento DATE DEFAULT NULL,
    is_ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cod_usuario_criacao INT NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    cod_usuario_updated INT DEFAULT NULL,
    FOREIGN KEY (cod_financeiro) REFERENCES coalemos.financeiro(cod),
    FOREIGN KEY (cod_usuario_criacao) REFERENCES coalemos.usuarios(cod),
    FOREIGN KEY (cod_usuario_updated) REFERENCES coalemos.usuarios(cod)
);


/**
* Insert iniciais
*/

INSERT INTO coalemos.usuarios
(nome, cpf, login, senha, is_primeiro_acesso, is_admin, is_ativo, created_at)
VALUES('Suporte', '07907907907', 'suporte@zuko.com',
'$2a$08$0wtNVjnFrsd/XeI/N6qN8Oc.JH.skwdIakx57oDgdOoRLAPcf42Sq', true, true, true, now());
