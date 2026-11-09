/**
 * Interruptor da demonstração sem backend.
 *
 * true  — GET/POST/PATCH/DELETE em /api/* são respondidos no navegador (localStorage).
 * false — o interceptor deixa a chamada seguir para apiURL em app.ts (API real).
 *
 * Ao publicar a API: coloque false aqui e aponte apiURL para a URL HTTPS.
 */
export const MODO_DEMONSTRACAO = false;
