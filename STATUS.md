# Status do projeto TODOapp

Documento para o time (Gustavo / João) acompanhar o que já está pronto e o que falta, principalmente para deploy (Vercel + VPS/Northflank).

Última atualização: 2026-11-08

---

## Estrutura atual do repositório

```text
SistemasIntegradosAngular/
├── README.md                 # Visão geral do projeto acadêmico
├── STATUS.md                 # Este arquivo
├── .gitignore
└── WEB_V3/WEB/
    ├── FRONTEND/TODOapp/     # Angular (SPA) — Aulas 01–08 Parte 1
    └── BACKEND/API/          # Express + Mongoose — Aula 06 + prep deploy
```

O código antigo na raiz (`src/`) foi removido: o app vive em `WEB_V3/WEB/`.

---

## O que já está feito

### Frontend (Angular)

- [x] Lista de tarefas, componente `item`, Signal `arrayDeTarefas`
- [x] `HttpClientModule` em `app-module.ts`
- [x] Classe `Tarefa` com `_id`
- [x] CRUD via HTTP (Aula 08 Parte 1):
  - `GET /api/getAll`
  - `POST /api/post`
  - `DELETE /api/delete/:id`
  - `PATCH /api/update/:id`
- [x] Evento `modificaTarefa` no `item`
- [x] Build estático SPA (`ng build` → `dist/TODOapp/browser`)
- [x] `vercel.json` configurado
- [x] Deploy de teste na Vercel (conta Gustavo):
  - https://todoapp-seven-gules-53.vercel.app
  - Observação: pode pedir login da Vercel (Deployment Protection)

Pasta: `WEB_V3/WEB/FRONTEND/TODOapp`

### Backend (Express + MongoDB)

- [x] API Express na porta `3000` (ou `process.env.PORT`)
- [x] CORS liberado (`*`)
- [x] Modelo `Tarefa` (`descricao`, `statusRealizada`)
- [x] Rotas CRUD em `/api/...`
- [x] Conexão MongoDB via:
  - `process.env.MONGO_URL` (produção / VPS / Northflank), ou
  - argumento CLI: `node index.js "mongodb+srv://..."`
- [x] Script `npm start` → `node index.js`
- [x] `Dockerfile`, `.dockerignore`, `Procfile`
- [x] Código da API já estava no GitHub (`main`)

Pasta: `WEB_V3/WEB/BACKEND/API`

### Banco de Dados

- [x] MongoDB Atlas (cluster do projeto)
- [x] Network Access / usuário configurados no ambiente local (já conectou com sucesso em desenvolvimento)

### Contas / plataformas (parcial)

- [x] Login CLI Northflank (conta GustaEagle / team)
- [x] Projeto Northflank `default` inicializado (`europe-west`)
- [x] Login CLI Vercel (conta gustaeagle)
- [x] Repositório GitHub: https://github.com/GustaEagle/SistemasIntegradosAngular

---

## O que ainda falta

### 1. Backend em produção (VPS ou Northflank) — prioridade João

Bloqueio anterior no Northflank: **exige cartão** para verificar a conta (Developer Sandbox; não cobra no plano free, mas não deixa criar serviço sem cartão).

Opções para o João:

**A) Northflank**

1. Adicionar método de pagamento na conta/team
2. Criar combined service `api-tarefas` apontando para este repo
3. Build context: `/WEB_V3/WEB/BACKEND/API`
4. Dockerfile: `/WEB_V3/WEB/BACKEND/API/Dockerfile`
5. Branch: `main`
6. Runtime env: `MONGO_URL` = connection string do Atlas (secret, não commit)
7. Porta pública HTTP `3000`
8. Anotar a URL HTTPS gerada (ex.: `https://api-tarefas-....northflank.app`)

**B) VPS própria (Hostinger / outro)**

1. Instalar Node.js LTS (recomendado ≥ 24.15)
2. Clonar o repo
3. `cd WEB_V3/WEB/BACKEND/API && npm ci`
4. Exportar `MONGO_URL` e `PORT`
5. Rodar com `npm start` (ou PM2 / systemd)
6. Abrir firewall na porta da API
7. Preferir HTTPS (nginx reverse proxy + certbot)

Teste rápido após subir:

```bash
curl https://SUA-URL-DA-API/api/getAll
```

### 2. Ligar frontend → API de produção

Arquivo: `WEB_V3/WEB/FRONTEND/TODOapp/src/app/app.ts`

Hoje ainda está:

```ts
this.apiURL = 'http://localhost:3000';
```

Trocar para a URL HTTPS da API (VPS/Northflank), rebuild e redeploy na Vercel:

```bash
cd WEB_V3/WEB/FRONTEND/TODOapp
# editar apiURL
npm run build
vercel --prod
```

### 3. MongoDB Atlas (produção)

- [ ] Confirmar Network Access liberando IP da VPS/Northflank (ou `0.0.0.0/0` só para estudo)
- [ ] Não colocar senha no Git; usar variável de ambiente / secret

### 4. Vercel (frontend público)

- [ ] Desativar Deployment Protection se o site precisar ser público sem login
- [ ] Redeploy depois de atualizar `apiURL`

### 5. Aulas / produto (roadmap acadêmico)

Ainda não feitos neste repo (conforme README das aulas):

- [ ] Aula 08 Parte 2 completa (hospedagem oficial da aula: Heroku + Hostinger) — estamos usando Vercel + Northflank/VPS no lugar
- [ ] Aulas 09–12 (controle de acesso, autenticação, hash/salt, gestão de usuários)

---

## Como rodar local (para quem clonar)

### Pré-requisitos

- Node.js ≥ 24.15 (Angular CLI do projeto)
- npm
- Conta MongoDB Atlas + connection string

### Backend

```bash
cd WEB_V3/WEB/BACKEND/API
npm ci
npm start
# ou, passando a URL na linha de comando:
# node index.js "mongodb+srv://USUARIO:SENHA@cluster.../?appName=Cluster0"
```

Com env:

```bash
# PowerShell
$env:MONGO_URL = "mongodb+srv://gustavo219852:219852@cluster0.zndzjsg.mongodb.net/?appName=Cluster0"
npm start
```

Esperado no console: `Server Started at 3000` e `Database Connected`.

### Frontend

```bash
cd WEB_V3/WEB/FRONTEND/TODOapp
npm ci
npx ng serve
```

Abrir: http://localhost:4200  
API local: `apiURL = 'http://localhost:3000'` (já está assim).

---

## Checklist rápido para o João (VPS)

1. Clonar: `git clone https://github.com/GustaEagle/SistemasIntegradosAngular.git`
2. Subir a API em `WEB_V3/WEB/BACKEND/API` com `MONGO_URL`
3. Validar `GET /api/getAll`
4. Passar a URL HTTPS da API para o Gustavo atualizar o frontend / Vercel
5. (Opcional) Configurar PM2 + nginx + SSL na VPS

---

## Observações de segurança

- Nunca commitar connection string com senha
- Rotacionar senha do Atlas se ela já vazou em terminal/chat
- Preferir HTTPS entre Vercel (frontend) e API
