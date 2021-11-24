export class RegistroDTO {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;

  constructor(
    nome: string,
    email: string,
    senha: string,
    dataNascimento: string
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataNascimento = dataNascimento;
  }
}
