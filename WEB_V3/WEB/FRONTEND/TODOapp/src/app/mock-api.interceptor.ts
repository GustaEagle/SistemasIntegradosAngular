import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MODO_DEMONSTRACAO } from './demo-mode';
import { Tarefa } from './tarefa';

const CHAVE_STORAGE = 'todoapp.tarefas.demo';

const SEMENTES: Tarefa[] = [
  { _id: 'demo-1', descricao: 'Estudar Frameworks WEB', statusRealizada: false },
  { _id: 'demo-2', descricao: 'Comer Pizza', statusRealizada: false },
  { _id: 'demo-3', descricao: 'Ajudar meus pais', statusRealizada: false },
];

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!MODO_DEMONSTRACAO || !req.url.includes('/api/')) {
      return next.handle(req);
    }

    const partes = this.caminho(req.url);
    const tarefas = this.ler();

    if (req.method === 'GET' && this.eh(partes, 'getAll')) {
      return this.ok(tarefas.map((tarefa) => ({ ...tarefa })));
    }

    if (req.method === 'POST' && this.eh(partes, 'post')) {
      const corpo = this.corpo(req);
      const nova: Tarefa = {
        _id: this.novoId(),
        descricao: corpo.descricao ?? '',
        statusRealizada: !!corpo.statusRealizada,
      };
      tarefas.unshift(nova);
      this.gravar(tarefas);
      return this.ok({ ...nova });
    }

    if (req.method === 'DELETE' && this.eh(partes, 'delete')) {
      const id = decodeURIComponent(partes[2]);
      const indice = tarefas.findIndex((tarefa) => tarefa._id === id);
      const removida = indice >= 0 ? tarefas.splice(indice, 1)[0] : null;
      this.gravar(tarefas);
      return this.ok(removida);
    }

    if (req.method === 'PATCH' && this.eh(partes, 'update')) {
      const id = decodeURIComponent(partes[2]);
      const corpo = this.corpo(req);
      const atual = tarefas.find((tarefa) => tarefa._id === id);
      if (atual) {
        if (typeof corpo.descricao === 'string') {
          atual.descricao = corpo.descricao;
        }
        if (typeof corpo.statusRealizada === 'boolean') {
          atual.statusRealizada = corpo.statusRealizada;
        }
      }
      this.gravar(tarefas);
      return this.ok(atual ? { ...atual } : null);
    }

    return next.handle(req);
  }

  private ok(body: unknown): Observable<HttpResponse<unknown>> {
    return of(new HttpResponse({ status: 200, body }));
  }

  private caminho(url: string): string[] {
    const pathname = url.startsWith('http') ? new URL(url).pathname : url.split('?')[0];
    return pathname.split('/').filter((parte) => parte.length > 0);
  }

  private eh(partes: string[], acao: string): boolean {
    return partes[0] === 'api' && partes[1] === acao;
  }

  private corpo(req: HttpRequest<unknown>): Partial<Tarefa> {
    const body = req.body;
    if (body && typeof body === 'object') {
      return body as Partial<Tarefa>;
    }
    return {};
  }

  private ler(): Tarefa[] {
    if (typeof localStorage === 'undefined') {
      return SEMENTES.map((tarefa) => ({ ...tarefa }));
    }

    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) {
      const copia = SEMENTES.map((tarefa) => ({ ...tarefa }));
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(copia));
      return copia;
    }

    try {
      const lista = JSON.parse(bruto) as Tarefa[];
      if (!Array.isArray(lista)) {
        return this.reporSementes();
      }
      return lista;
    } catch {
      return this.reporSementes();
    }
  }

  private reporSementes(): Tarefa[] {
    const copia = SEMENTES.map((tarefa) => ({ ...tarefa }));
    this.gravar(copia);
    return copia;
  }

  private gravar(tarefas: Tarefa[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
  }

  private novoId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return `demo-${Date.now()}`;
  }
}
