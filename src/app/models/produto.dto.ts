export class ProdutoDTO {
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  urlImagem: string;

  constructor(
    id: number,
    titulo: string,
    descricao: string,
    valor: number,
    urlImagem: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.valor = valor;
    this.urlImagem = urlImagem;
  }
}
