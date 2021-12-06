import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformacaoPacienteDTO } from '../models/informacao-paciente.dto';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  respondeuQuestionario = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {}

  salvar(paciente: InformacaoPacienteDTO) {
    return this.httpClient.post<void>(
      'http://localhost:8080/paciente/salvar',
      paciente
    );
  }

  adquirirTodos(): Observable<Array<InformacaoPacienteDTO>> {
    return this.httpClient.get<Array<InformacaoPacienteDTO>>(
      'http://localhost:8080/paciente/adquirirTodos'
    );
  }

  deletar(codigoPaciente: number) {
    const params = new HttpParams().set(
      'codigoPaciente',
      codigoPaciente.toString()
    );

    return this.httpClient.delete<void>(
      'http://localhost:8080/paciente/deletar',
      { params }
    );
  }

  verificarRespostaQuestionario() {
    const params = new HttpParams().set(
      'token',
      this.autenticacaoService.getToken()
    );

    return this.httpClient.get<boolean>(
      'http://localhost:8080/paciente/validarQuestionario',
      { params }
    );
  }

  emitirRespondeuQuestionario(respondeu: boolean) {
    this.respondeuQuestionario.next(respondeu);
  }
}
