export class EmpresaDTO {
  id: number;
  nome: string;
  cnpj: string;
  dataAbertura: string;
  nomeFundador: string;
  codigoCidade: number;

  constructor(
    id: number,
    nome: string,
    cnpj: string,
    dataAbertura: string,
    nomeFundador: string,
    codigoCidade: number
  ) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.dataAbertura = dataAbertura;
    this.nomeFundador = nomeFundador;
    this.codigoCidade = codigoCidade;
  }
}
