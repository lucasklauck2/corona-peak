import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaDTO } from './../models/empresa.dto';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private httpClient: HttpClient) {}

  salvar(empresas: Array<EmpresaDTO>) {
    return this.httpClient.post<void>(
      'http://localhost:8080/empresa/salvar',
      empresas
    );
  }

  adquirirTodas(): Observable<Array<EmpresaDTO>> {
    return this.httpClient.get<Array<EmpresaDTO>>(
      'http://localhost:8080/empresa/adquirirTodas'
    );
  }

  deletar(codigoEmpresa: number) {
    const params = new HttpParams().set(
      'codigoEmpresa',
      codigoEmpresa.toString()
    );

    return this.httpClient.delete<void>(
      'http://localhost:8080/empresa/deletar',
      { params }
    );
  }
}
