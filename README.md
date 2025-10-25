# 💼 Sistema de Gestão Corporativa

Este projeto é um sistema completo de gestão empresarial que integra módulos de **autenticação**, **financeiro**, **agendamentos**, **cadastro de clientes** e **gerência de documentos**.
O objetivo é oferecer uma solução centralizada, segura e escalável para controle operacional e financeiro de empresas de pequeno e médio porte.

---

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-------------|
| **Backend** | Node.js + Express + TypeScript |
| **Banco de Dados** | PostgreSQL com Knex.js |
| **Autenticação** | JWT (JSON Web Token) |
| **ORM / Query Builder** | Knex.js |
| **Infraestrutura** | Docker + Docker Compose |
| **Logs e Monitoramento** | Winston |
| **Documentação API** | Swagger (via swagger-ui-express) |

---

## 🧩 Módulos do Sistema

### 🔐 **Autenticação e Usuários**
- Login e logout com **JWT**.
- Recuperação e redefinição de senha.
- Perfis e níveis de acesso (ex: administrador, financeiro, operador).
- Controle de sessão e refresh token.
- Tabela: `usuarios`

---

### 💰 **Módulo Financeiro**
Gerencia contas **a pagar e a receber**, controle de **parcelas**, **valores líquidos e brutos**, **acréscimos e descontos**.

**Principais recursos:**
- Cadastro de lançamentos financeiros.
- Geração e controle de parcelas.
- Atualização automática de status (pendente, pago, atrasado, cancelado).
- Relatórios de fluxo de caixa e histórico de pagamentos.

**Tabelas:**
- `financeiro`
- `financeiro_parcelas`

---

### 📅 **Módulo de Agendamentos**
Sistema de controle de compromissos e atividades da empresa.

**Funcionalidades:**
- Agendamento de atendimentos, visitas, reuniões ou serviços.
- Integração com clientes e responsáveis.
- Alteração e cancelamento de compromissos.
- Visualização por dia, semana ou mês.

**Tabela:**
- `agendamentos`

---

### 👥 **Módulo de Clientes**
Centraliza o cadastro de clientes e seus dados de contato.

**Recursos:**
- Cadastro completo de pessoa física e jurídica.
- Endereços, telefones, e-mails e observações.
- Histórico de agendamentos e documentos.
- Busca e filtros avançados por nome, CPF/CNPJ ou status.

**Tabela:**
- `clientes`

---

### 📂 **Módulo de Documentos**
Gerência de documentos vinculados a clientes ou lançamentos financeiros.

**Funcionalidades:**
- Upload de arquivos (PDF, imagens, planilhas).
- Controle de versão e histórico de uploads.
- Associação a clientes, agendamentos ou lançamentos.
- Armazenamento local ou em S3 ou no banco de dados (configurável).

**Tabela:**
- `documentos`

---

## 🧱 Estrutura de Pastas (Backend)

```
src/
 ├─ services/
 │   ├─ session/
 │   ├─ user/
 │   ├─ financial/
 │   ├─ client/
 │   ├─ schedule/
 │   └─ documents/
 │
 ├─ databases/
 │   ├─ seeds/
 │   └─ pgConnection.ts
 │
 ├─ controllers/
 ├─ config/
 ├─ @types/
 ├─ interfaces/
 ├─ helpers/
 ├─ middlewares/
 ├─ routes/
 └─ app.ts
```

---

## ⚙️ Como Rodar o Projeto

### 🐳 Usando Docker
```bash
# 1. Subir containers
docker-compose up -d

```

### 💻 Rodando localmente
```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Rodar o servidor
npm run dev
```

---

## 🔑 Variáveis de Ambiente (.env)

```bash
#container docker
COMPOSE_PROJECT_NAME=coalemos

CONTAINER_APP_PORT=3331
CONTAINER_DATABASE_PORT=5432

# Servidor
NODE_ENV=development
APP_PORT=3000

# Banco de Dados
DATABASE_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_NAME=db_api
DB_PASSWORD=postgres

# JWT
ACCESS_TOKEN_SECRET=seu_token_secreto
REFRESH_TOKEN_SECRET=seu_token_secreto
ACCESS_TOKEN_EXPIRATION=360
REFRESH_TOKEN_EXPIRATION=600
```

---

## 📘 Documentação da API

Após rodar o servidor, acesse:
```
http://localhost:3333/api-docs
```
A documentação está gerada automaticamente via **Swagger**, com exemplos de requisição e resposta.

---

## 🧠 Boas Práticas Adotadas

- Clean Architecture e DDD simplificado por módulos.
- Tipagem forte com **TypeScript**.
- Uso de **transações no Knex** para garantir consistência.
- **Logs estruturados** com Winston.
- Padronização de rotas RESTful (`/auth`, `/clientes`, `/financeiro`, etc).
- Tratamento de erros centralizado.

---

## 👨‍💻 Autor

**Edson Cândido**
Desenvolvedor Full Stack
📧 [Gmail](mailto:edsonj85@gmail.com)
💼 [LinkedIn](www.linkedin.com/in/edson-caj) • [GitHub](https://github.com/EdsonCandido)

---

## 🧾 Licença

Este projeto está sob a licença **MIT**.
Sinta-se livre para usar, modificar e contribuir!
