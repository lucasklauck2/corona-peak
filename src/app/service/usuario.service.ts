import { MessageService } from 'primeng/api';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioInformacaoDTO } from './../models/usuarioinformacao.dto';
import { LoginDTO } from '../models/login.dto';
import { RegistroDTO } from '../models/registro.dto';
import { RetornoLoginDTO } from '../models/retorno-login.dto';
import { RetornoRegistroDTO } from '../models/retorno-registro.dto';
import { AutenticacaoService } from './autenticacao.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  estaLogado = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {}

  adquirirDados() {
    const params = new HttpParams().set(
      'token',
      this.autenticacaoService.getToken()
    );

    return this.httpClient.get<UsuarioInformacaoDTO>(
      'http://localhost:8080/usuario/adquirirDados',
      { params }
    );
  }
}
