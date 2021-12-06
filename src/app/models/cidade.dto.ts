export class CidadeDTO {
  id: number;
  nome: string;
  estado: string;
  sigla: string;

  constructor(id?: number, nome?: string, estado?: string, sigla?: string) {
    this.id = id;
    this.nome = nome;
    this.estado = estado;
    this.sigla = sigla;
  }
}
