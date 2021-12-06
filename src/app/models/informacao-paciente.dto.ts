import { SintomaDTO } from './sintoma.dto';
export class InformacaoPacienteDTO {
  id: number;
  nome: string;
  dataNascimento: string;
  peso: number;
  altura: number;
  codigoCidade: number;
  codigoEmpresa: number;
  flagPositivado: boolean;
  flagSuspeito: boolean;
  flagDoencaRespiratoria: boolean;
  codigoUsuario: number;
  listaSintoma: Array<number>;

  constructor(
    id: number,
    nome: string,
    dataNascimento: string,
    peso: number,
    altura: number,
    codigoCidade: number,
    codigoEmpresa: number,
    flagPositivado: boolean,
    flagSuspeito: boolean,
    flagDoencaRespiratoria: boolean,
    listaSintoma: Array<number>
  ) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.peso = peso;
    this.altura = altura;
    this.codigoCidade = codigoCidade;
    this.codigoEmpresa = codigoEmpresa;
    this.flagPositivado = flagPositivado;
    this.flagSuspeito = flagSuspeito;
    this.flagDoencaRespiratoria = flagDoencaRespiratoria;
    this.listaSintoma = listaSintoma;
  }
}
