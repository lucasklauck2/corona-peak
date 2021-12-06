export class DadosRelatorioTresDTO {
  codigoCidade: number;
  nomeCidade: string;
  quantidadeSuspeito: number;

  constructor(
    codigoCidade: number,
    nomeCidade: string,
    quantidadeSuspeito: number
  ) {
    this.codigoCidade = codigoCidade;
    this.nomeCidade = nomeCidade;
    this.quantidadeSuspeito = quantidadeSuspeito;
  }
}
