import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CidadeDTO } from './../models/cidade.dto';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  constructor(private httpClient: HttpClient) {}

  salvar(cidades: Array<CidadeDTO>) {
    return this.httpClient.post<void>(
      'http://localhost:8080/cidade/salvar',
      cidades
    );
  }

  adquirirTodas(): Observable<Array<CidadeDTO>> {
    return this.httpClient.get<Array<CidadeDTO>>(
      'http://localhost:8080/cidade/adquirirTodas'
    );
  }

  deletar(codigoCidade: number) {
    const params = new HttpParams().set(
      'codigoCidade',
      codigoCidade.toString()
    );

    return this.httpClient.delete<void>(
      'http://localhost:8080/cidade/deletar',
      { params }
    );
  }
}
