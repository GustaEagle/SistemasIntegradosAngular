# ✅ TODOapp Fullstack

Projeto acadêmico desenvolvido ao longo das aulas de **Frameworks WEB**, com o objetivo de construir, passo a passo, um sistema completo de gerenciamento de tarefas utilizando uma arquitetura **Fullstack**.

A aplicação começa com um frontend simples em **Angular** e evolui gradualmente para uma solução completa com **Frontend, Backend, Banco de Dados, autenticação, controle de acesso e deploy em nuvem**.

---

## 📌 Sobre o projeto

O **TODOapp** é um sistema de gerenciamento de tarefas que permitirá ao usuário:

- Criar novas tarefas;
- Visualizar tarefas cadastradas;
- Alterar tarefas existentes;
- Excluir tarefas;
- Marcar tarefas como realizadas ou não realizadas;
- Persistir os dados em banco de dados;
- Realizar autenticação de usuários;
- Controlar o acesso às funcionalidades da aplicação;
- Utilizar senhas armazenadas de forma segura com **Hash e Salt**.

O projeto será desenvolvido de forma incremental, acompanhando o conteúdo apresentado em aula.

---

## 🏗️ Arquitetura

A aplicação será dividida em três partes principais:

```text
┌─────────────────┐
│    FRONTEND     │
│     Angular     │
└────────┬────────┘
         │
         │ HTTP / API
         ▼
┌─────────────────┐
│     BACKEND     │
│ Node.js/Express │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ BANCO DE DADOS  │
│     MongoDB     │
└─────────────────┘
```

### Frontend

Responsável pela interface utilizada pelo usuário.

Tecnologia principal:

- Angular

### Backend

Responsável pelas regras de negócio e pela disponibilização dos serviços utilizados pelo frontend.

Tecnologias principais:

- Node.js
- Express

### Banco de Dados

Responsável pela persistência das informações da aplicação.

Tecnologia utilizada:

- MongoDB

---

## 🚀 Tecnologias utilizadas

Durante o desenvolvimento do projeto serão utilizadas:

- **HTML**
- **CSS**
- **TypeScript**
- **Angular**
- **Angular CLI**
- **Node.js**
- **Express**
- **MongoDB**
- **Git**
- **Postman**
- **REST API**
- **Hash e Salt para proteção de senhas**

---

# 📚 Evolução do projeto

O repositório acompanha a evolução do sistema conforme o conteúdo das aulas.

## Aula 01 — Introdução ao Desenvolvimento WEB

Nesta etapa são apresentados os principais conceitos utilizados durante o projeto.

Conteúdos:

- Introdução ao desenvolvimento WEB;
- Frontend, Backend e Banco de Dados;
- Arquitetura da aplicação;
- Instalação do Visual Studio Code;
- Instalação do Git;
- Instalação do Node.js;
- Instalação do Angular CLI;
- Instalação do Postman;
- Criação do workspace;
- Criação do projeto Angular;
- Execução do servidor local;
- Primeiras alterações na View do `AppComponent`.

Criação inicial do projeto:

```bash
ng new TODOapp --routing=false --style=css --no-standalone
```

Execução:

```bash
cd TODOapp
ng serve
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

## Aula 02 — Apresentando uma Lista de Tarefas

Nesta etapa é criada a primeira estrutura funcional do TODOapp.

### Classe `Tarefa`

Cada tarefa possui inicialmente:

```typescript
export class Tarefa {
  descricao: string;
  statusRealizada: boolean;

  constructor(_descricao: string, _statusRealizada: boolean) {
    this.descricao = _descricao;
    this.statusRealizada = _statusRealizada;
  }
}
```

### Array de tarefas

As tarefas são armazenadas inicialmente em memória:

```typescript
arrayDeTarefas: Tarefa[] = [];
```

### Leitura das tarefas

O método `READ_tarefas()` simula a leitura das tarefas:

```typescript
READ_tarefas() {
  this.arrayDeTarefas = [
    new Tarefa("Estudar Frameworks WEB", false),
    new Tarefa("Comer Pizza", false),
    new Tarefa("Ajudar meus pais", false)
  ];
}
```

### Criação de tarefas

O método `CREATE_tarefa()` permite adicionar uma nova tarefa:

```typescript
CREATE_tarefa(descricaoNovaTarefa: string) {
  var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
  this.arrayDeTarefas.unshift(novaTarefa);
}
```

Nesta etapa também são utilizados conceitos importantes do Angular, como:

- `*ngFor`;
- Interpolação `{{ }}`;
- Referências locais com `#`;
- Event Binding com `(click)`;
- CSS global;
- CSS específico de componentes.

---

# 🗺️ Roadmap das aulas

O sistema será evoluído gradualmente.

- [x] Aula 01 — Introdução ao Desenvolvimento WEB
- [x] Aula 02 — Apresentando uma Lista de Tarefas
- [ ] Aula 03 — Criando um novo componente Angular
- [ ] Aula 04 — Data Binding
- [ ] Aula 05 — Preparando o Banco de Dados
- [ ] Aula 06 — Backend com Node.js e Express
- [ ] Aula 07 — Integração entre Frontend e Backend
- [ ] Aula 08 — Hospedando o APP na nuvem
- [ ] Aula 09 — Controle de Acesso
- [ ] Aula 10 — Autenticação de usuários no Banco de Dados
- [ ] Aula 11 — Gerenciamento de usuários
- [ ] Aula 12 — Proteção de senhas com Hash e Salt

---

# 🎯 Objetivo final

Ao término das aulas, o projeto deverá possuir uma arquitetura semelhante a:

```text
Usuário
   │
   ▼
Angular
Frontend
   │
   │ Requisições HTTP
   ▼
REST API
Node.js + Express
   │
   ▼
MongoDB
```

Com funcionalidades como:

```text
CRUD DE TAREFAS

CREATE  → Criar tarefa
READ    → Consultar tarefas
UPDATE  → Alterar tarefa
DELETE  → Remover tarefa
```

Além disso, o sistema deverá contar com:

- Cadastro de usuários;
- Login;
- Controle de acesso;
- Autenticação;
- Proteção de rotas;
- Persistência das tarefas;
- Integração Frontend/Backend;
- Armazenamento seguro de senhas;
- Deploy da aplicação.

---

# 📂 Estrutura inicial do projeto

Uma estrutura simplificada do frontend Angular:

```text
TODOapp/
│
├── src/
│   │
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── tarefa.ts
│   │
│   ├── styles.css
│   └── index.html
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

A estrutura será ampliada conforme forem adicionados novos componentes, serviços, Backend e Banco de Dados.

---

# ⚙️ Como executar o projeto

## Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js;
- npm;
- Angular CLI.

Verifique as instalações:

```bash
node --version
npm --version
ng version
```

---

## Instalação

Clone o repositório:

```bash
git clone <URL-DO-REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd TODOapp
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
ng serve
```

Abra no navegador:

```text
http://localhost:4200
```

---

# 🧪 Testes durante o desenvolvimento

Durante as aulas poderão ser utilizadas ferramentas como:

### Browser

Para testar o frontend Angular.

```text
http://localhost:4200
```

### Postman

Será utilizado principalmente quando o Backend estiver disponível, permitindo testar requisições HTTP diretamente na API.

Exemplos futuros:

```http
GET /tarefas
POST /tarefas
PUT /tarefas/:id
DELETE /tarefas/:id
```

---

# 🌿 Organização do repositório

Para acompanhar a evolução das aulas, recomenda-se utilizar commits descritivos.

Exemplos:

```text
feat: cria projeto angular inicial
feat: adiciona classe tarefa
feat: implementa listagem de tarefas
feat: adiciona criação de novas tarefas
style: melhora interface do todoapp
feat: cria componente de tarefas
feat: integra frontend com backend
feat: adiciona autenticação
```

Também podem ser utilizadas tags ou branches para representar cada etapa do curso.

Exemplo:

```text
aula-01
aula-02
aula-03
...
```

---

# 💡 Conceitos trabalhados

Ao longo do projeto serão praticados conceitos importantes de desenvolvimento WEB:

- Single Page Applications;
- Componentização;
- TypeScript;
- Orientação a Objetos;
- Data Binding;
- Diretivas Angular;
- Event Binding;
- APIs REST;
- Requisições HTTP;
- CRUD;
- Arquitetura Client-Server;
- Persistência de dados;
- Autenticação;
- Autorização;
- Segurança de senhas;
- Deploy de aplicações.

---

# 🎓 Contexto acadêmico

Projeto desenvolvido como parte das aulas de **Frameworks WEB / Projeto de Sistemas Integrados**, acompanhando a evolução de uma aplicação desde os conceitos básicos de frontend até uma aplicação Fullstack completa.

O objetivo principal é compreender como as diferentes camadas de uma aplicação WEB se conectam na prática.

---

## 📄 Licença

Este projeto possui finalidade **acadêmica e educacional**.
