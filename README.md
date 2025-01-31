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

## Design Patterns

A aplicação segue uma arquitetura bem estruturada com Node.js + Express + TypeScript no backend e Angular + Tailwind CSS no frontend, aplicando diversos padrões de projeto para organização, testabilidade e reutilização de código.

### Backend (Node.js + Express)
- Factory Pattern: Usado para gerenciar dependências, como a criação de uma instância única do Axios no gitHubService.ts.

- Repository Pattern: Isola a lógica de acesso a dados, como no favoriteModel.ts, que gerencia a persistência em um JSON.

- Singleton Pattern: O Express (app.ts) funciona como um singleton, garantindo uma única instância da aplicação.

- Dependency Injection: Implementado no gitHubService.ts, facilitando testes e substituição de dependências.

- Middleware Pattern: Middlewares aplicados globalmente para CORS, parsing de JSON e tratamento de erros.

- Strategy Pattern: Diferentes estratégias usadas na busca de repositórios ou usuários no searchRepos.

### Frontend (Angular + Tailwind CSS)

- Component-Based Architecture: Aplicação modularizada em componentes reutilizáveis (search.component.ts, repositories.component.ts, favorites.component.ts).

- Observer Pattern: Implementado via Observables (RxJS) no api.service.ts, permitindo reatividade.

- Smart & Dumb Components: O ApiService gerencia os dados (Smart), enquanto componentes de UI são Dumb (apenas exibição).

- Gerenciamento de Estado: Dados da API são centralizados no api.service.ts, reduzindo re-renderizações desnecessárias.

### Testes

- Mocking: Utilizado para testar serviços no backend com Jest e no frontend com Jasmine.

- Spy Pattern: Verifica chamadas a métodos importantes, como toastr.success().