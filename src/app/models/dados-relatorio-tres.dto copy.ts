export class DadosRelatorioQuatroDTO {
  idade: number;
  quantidadeCasos: number;

  constructor(idade: number, quantidadeCasos: number) {
    this.idade = idade;
    this.quantidadeCasos = quantidadeCasos;
  }
}
