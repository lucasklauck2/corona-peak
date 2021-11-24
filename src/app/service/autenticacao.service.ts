import { MessageService } from 'primeng/api';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from './../models/login.dto';
import { RegistroDTO } from './../models/registro.dto';
import { RetornoLoginDTO } from './../models/retorno-login.dto';
import { RetornoRegistroDTO } from './../models/retorno-registro.dto';
import { LocalStorageService } from './local-storage.service';
import { ToastService } from './toast-service.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  estaLogado = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private toastService: ToastService
  ) {}

  entrar(loginDTO: LoginDTO) {
    this.httpClient
      .post<RetornoLoginDTO>(
        'http://localhost:8080/autenticacao/entrar',
        loginDTO
      )
      .subscribe(
        (retornoLoginDTO) => this.realizarLogin(retornoLoginDTO),
        (erro) => this.toastService.addError(erro.error.message)
      );
  }

  registrar(registroDTO: RegistroDTO) {
    this.httpClient
      .post<RetornoRegistroDTO>(
        'http://localhost:8080/autenticacao/registrar',
        registroDTO
      )
      .subscribe(
        (retornoRegistroDTO) => this.realizarLogin(retornoRegistroDTO),
        (erro) => this.toastService.addError(erro.error.message)
      );
  }

  realizarLogin(retorno: RetornoLoginDTO | RetornoRegistroDTO) {
    this.localStorageService.set('token', retorno.token);

    this.mensagemLoginSucesso(retorno.mensagem);

    setTimeout(() => {
      this.emitirMensagemLogado(true);

      this.router.navigate(['/']);
    }, 600);
  }

  emitirMensagemLogado(estaLogado: boolean) {
    this.estaLogado.next(estaLogado);
  }

  usuarioJaLogado() {
    if (!this.localStorageService.get('token')) {
      return false;
    }

    return true;
  }

  deslogar() {
    this.localStorageService.remove('token');

    this.mensagemLoginInfo("Você saiu, até breve :'(");

    setTimeout(() => {
      this.emitirMensagemLogado(false);

      this.router.navigate(['/autenticacao']);
    }, 600);
  }

  getToken() {
    return this.localStorageService.get('token');
  }

  private mensagemLoginSucesso(mensagem: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
    });
  }

  private mensagemLoginErro(mensagem: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Login falhou',
      detail: mensagem,
    });
  }

  private mensagemLoginInfo(mensagem: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: mensagem,
    });
  }
}
