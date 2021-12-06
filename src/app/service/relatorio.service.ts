import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosRelatorioDTO } from './../models/dados-relatoriodto';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  constructor(private httpClient: HttpClient) {}

  adquirirTodos(): Observable<DadosRelatorioDTO> {
    return this.httpClient.get<DadosRelatorioDTO>(
      'http://localhost:8080/relatorio/adquirirDados'
    );
  }
}
