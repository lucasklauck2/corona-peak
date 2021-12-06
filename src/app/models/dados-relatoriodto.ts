import { DadosRelatorioDoisDTO } from './dados-relatorio-dois.dto';
import { DadosRelatorioTresDTO } from './dados-relatorio-tres.dto';
import { DadosRelatorioQuatroDTO } from './dados-relatorio-tres.dto copy';
import { DadosRelatorioUmDTO } from './dados-relatorio-um.dto';
export class DadosRelatorioDTO {
  listaDadosRelatorioUm: Array<DadosRelatorioUmDTO>;
  listaDadosRelatorioDois: Array<DadosRelatorioDoisDTO>;
  listaDadosRelatorioTres: Array<DadosRelatorioTresDTO>;
  listaDadosRelatorioQuatro: Array<DadosRelatorioQuatroDTO>;

  constructor() {}
}
