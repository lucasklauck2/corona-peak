export class UsuarioInformacaoDTO {
  nome: string;
  email: string;
  novaSenha: string;
  dataNascimento: string;
  dataCadastro: string;
  senhaAtual: string;
  token: string;

  constructor(
    nome: string,
    email: string,
    novaSenha: string,
    dataNascimento: string,
    dataCadastro: string,
    senhaAtual: string,
    token: string
  ) {
    this.nome = nome;
    this.email = email;
    this.novaSenha = novaSenha;
    this.dataNascimento = dataNascimento;
    this.dataCadastro = dataCadastro;
    this.senhaAtual = senhaAtual;
    this.token = token;
  }
}
