# Desafio Git

## Tecnologias Utilizadas

Backend: Node.js com Express e TypeScript

Frontend: Angular e Tailwind CSS

Documentação: Swagger

## Como Rodar o Backend

### 1. Pré-requisitos

Certifique-se de ter instalado:

Node.js (>= 16)

NPM ou Yarn

### 2. Configuração do Ambiente

Crie um arquivo .env na raiz do backend com as configurações necessárias expostas no arquivo .env.example

### 3. Instalando Dependências

Execute o seguinte comando dentro da pasta backend:

npm install

### 4. Executando a API

Para rodar a aplicação em modo de desenvolvimento:

npm run dev

Para compilar e rodar em produção:

npm run build
node dist/server.js

### 5. Rodando Testes

npm run test

## Como Rodar o Frontend

### 1. Pré-requisitos

Certifique-se de ter instalado:

Node.js (>= 16)

NPM ou Yarn

Angular CLI

Caso não tenha o Angular CLI instalado, instale com:

npm install -g @angular/cli

### 2. Instalando Dependências

Entre na pasta frontend e execute:

npm install

### 3. Executando a Aplicação

Para rodar o frontend em modo de desenvolvimento:

npm start

Acesse a aplicação em: http://localhost:4200

Acessando a Documentação das Rotas (Swagger)

Após rodar o backend, acesse a documentação das APIs em:

http://localhost:3000/api-docs

Essa página contém todas as rotas disponíveis, métodos HTTP, parâmetros e exemplos de respostas.