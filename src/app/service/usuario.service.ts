import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInformacaoDTO } from './../models/usuarioinformacao.dto';
import { AutenticacaoService } from './autenticacao.service';

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

  adquirirTipoUsuario(): Observable<number> {
    const params = new HttpParams().set(
      'token',
      this.autenticacaoService.getToken()
    );

    return this.httpClient.get<number>(
      'http://localhost:8080/usuario/adquirirTipoUsuario',
      { params }
    );
  }
}
