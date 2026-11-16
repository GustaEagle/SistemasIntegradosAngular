import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL: string;
  usuarioLogado = signal(false);
  tokenJWT = '{ "token":""}';

  constructor(private http: HttpClient) {
    // Local (Aula 10) — não usa a API do deploy
    this.apiURL = 'http://localhost:3000';
  }

  login(username: string, password: string) {
    var credenciais = { "nome": username, "senha": password }
    this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(resultado => {
      this.tokenJWT = JSON.stringify(resultado);
      this.READ_tarefas();
    });
  }

  private headersComToken() {
    return new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  }

  READ_tarefas() {
    const idToken = this.headersComToken();
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe({
      next: (resultado) => { this.arrayDeTarefas.set(resultado); this.usuarioLogado.set(true) },
      error: () => { this.usuarioLogado.set(false) }
    })
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { 'headers': this.headersComToken() }).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`, { 'headers': this.headersComToken() }).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
      tarefaAserModificada, { 'headers': this.headersComToken() }).subscribe(
        resultado => { console.log(resultado); this.READ_tarefas(); });
  }

}
