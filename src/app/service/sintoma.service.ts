import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SintomaDTO } from './../models/sintoma.dto';

@Injectable({
  providedIn: 'root',
})
export class SintomaService {
  constructor(private httpClient: HttpClient) {}

  salvar(sintomas: Array<SintomaDTO>) {
    return this.httpClient.post<void>(
      'http://localhost:8080/sintoma/salvar',
      sintomas
    );
  }

  adquirirTodos(): Observable<Array<SintomaDTO>> {
    return this.httpClient.get<Array<SintomaDTO>>(
      'http://localhost:8080/sintoma/adquirirTodos'
    );
  }

  deletar(codigoSintoma: number) {
    const params = new HttpParams().set(
      'codigoSintoma',
      codigoSintoma.toString()
    );

    return this.httpClient.delete<void>(
      'http://localhost:8080/sintoma/deletar',
      { params }
    );
  }
}
