# Status do projeto TODOapp

Documento para o time (Gustavo / João) acompanhar o que já está pronto e o que falta, principalmente para deploy (Vercel + Northflank).

Última atualização: 2026-11-09

---

## Estrutura atual do repositório

```text
SistemasIntegradosAngular/
├── README.md                 # Visão geral do projeto acadêmico
├── STATUS.md                 # Este arquivo
├── qr-frontend.png           # QR Code do frontend (para o professor)
├── .gitignore
└── WEB_V3/WEB/
    ├── FRONTEND/TODOapp/     # Angular (SPA) — Aulas 01–08 Parte 1
    └── BACKEND/API/          # Express + Mongoose — Aula 06 + prep deploy
```

O código antigo na raiz (`src/`) foi removido: o app vive em `WEB_V3/WEB/`.

---

## URLs de produção (prontas para o TP)

| Item | URL |
|------|-----|
| Frontend (Vercel) | https://todoapp-seven-gules-53.vercel.app |
| API getAll | https://http--apitarefasgustavo219852-joao218797--r7xyk2hxmmk7.code.run/api/getAll |
| QR Code | `qr-frontend.png` na raiz do repo |

Nome do serviço/backend (padrão da aula `apitarefas` + nome/RA): `apitarefasgustavo219852-joao218797`  
Texto exigido no getAll: `apiTarefasgustavo219852_joao218797` (já presente na API).

---

## O que já está feito

### Frontend (Angular)

- [x] Lista de tarefas, componente `item`, Signal `arrayDeTarefas`
- [x] `HttpClientModule` em `app-module.ts`
- [x] Classe `Tarefa` com `_id`
- [x] CRUD via HTTP (Aula 08 Parte 1)
- [x] Build estático SPA (`ng build` → `dist/TODOapp/browser`)
- [x] `vercel.json` configurado
- [x] `apiURL` apontando para a API Northflank (HTTPS)
- [x] Deploy produção na Vercel
- [x] Deployment Protection (SSO) desativado — site público

Pasta: `WEB_V3/WEB/FRONTEND/TODOapp`

### Backend (Express + MongoDB)

- [x] API Express na porta `3000` (ou `process.env.PORT`)
- [x] CORS liberado (`*`)
- [x] Modelo `Tarefa` + rotas CRUD em `/api/...`
- [x] `MONGO_URL` via env em produção
- [x] Deploy Northflank: `https://http--api-tarefas--r7xyk2hxmmk7.code.run`
- [x] Tarefa do TP criada: `apiTarefasgustavo219852_joao218797`

Pasta: `WEB_V3/WEB/BACKEND/API`

### Banco / contas

- [x] MongoDB Atlas conectado
- [x] Northflank (Developer Sandbox) + Vercel + GitHub

---

## Como mostrar o TP ao professor

1. Abrir o frontend no Chrome: https://todoapp-seven-gules-53.vercel.app
2. Mostrar o QR Code (`qr-frontend.png` ou a aba do gerador já aberta)
3. Em outra aba: https://http--apitarefasgustavo219852-joao218797--r7xyk2hxmmk7.code.run/api/getAll
   - Confirmar o texto `apiTarefasgustavo219852_joao218797`
4. Obter a senha a partir da tarefa criada pelo professor no App

---

## Como rodar local

### Backend

```bash
cd WEB_V3/WEB/BACKEND/API
npm ci
# PowerShell: $env:MONGO_URL = "mongodb+srv://..."
npm start
```

### Frontend

```bash
cd WEB_V3/WEB/FRONTEND/TODOapp
npm ci
npx ng serve
```

Em local, se precisar, volte `apiURL` temporariamente para `http://localhost:3000`.

---

## Observações de segurança

- Nunca commitar connection string com senha
- Rotacionar senha do Atlas se ela já vazou em terminal/chat
- Preferir HTTPS entre Vercel (frontend) e API
