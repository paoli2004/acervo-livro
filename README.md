<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

## 📚 Acervo de Livros
Sistema para gerenciamento de livros e empréstimos

---

## 💻 SO utilizada

- WSL Ubuntu

---

## 🛠️ Ferramentas e linguagens utilizadas

- Back-end: Node.js + TypeScript  
- Front-end: React  
- Banco de dados: PostgreSQL  

---

## ▶️ Iniciando o projeto

```bash
$ yarn install
```

## 🚀 Compilando o projeto
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## ⚙️ Configuração do ambiente (.env)

O projeto já contém um arquivo de exemplo chamado .env_copy.

```bash
# Copie o arquivo de exemplo para criar seu arquivo de configuração
cp .env_copy .env
```
### 📌 Configuração do banco de dados (.env)

Edite o arquivo `.env` gerado e configure as credenciais do PostgreSQL:

# Porta da aplicação
`PORT=3000`

```env
# Configuração do banco de dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=acervo_livro
DB_USER=postgres
DB_PASS=postgres
```

⚠️ Ajuste os valores conforme sua instalação local do PostgreSQL.

## Comandos adicionais (caso não possua PostgreSQL instalado)
```bash
# Atualiza a lista de pacotes do sistema
$ sudo apt update

# Instala o PostgreSQL e ferramentas adicionais
$ sudo apt install postgresql postgresql-contrib

# Inicia o serviço do PostgreSQL
$ sudo service postgresql start

# Instala as dependências de banco de dados no projeto NestJS
# TypeORM: ORM para manipulação do banco
# @nestjs/typeorm: integração com NestJS
# pg: driver do PostgreSQL para Node.js
$ yarn add typeorm @nestjs/typeorm pg
```
