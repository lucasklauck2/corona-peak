import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeDTO } from './../../../models/cidade.dto';
import { EmpresaDTO } from './../../../models/empresa.dto';
import { CidadeService } from './../../../service/cidade.service';
import { EmpresaService } from './../../../service/empresa.service';
import { ToastService } from '../../../service/toast-service.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
  form: FormGroup;

  empresas: Array<EmpresaDTO> = [];
  cidades: Array<CidadeDTO> = [];

  cidadeSelecionada: CidadeDTO;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private cidadeService: CidadeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.atualizarItensGrid();

    this.form = this.fb.group({
      id: [null],
      nome: [[''], [Validators.minLength(4)]],
      cnpj: [[''], [Validators.minLength(12)]],
      dataAbertura: [null, [Validators.minLength(10)]],
      nomeFundador: [[''], [Validators.minLength(5)]],
      codigoCidade: [[null], [Validators.nullValidator]],
    });

    this.cidadeService.adquirirTodas().subscribe(
      (cidades) => (this.cidades = cidades),
      (erro) => this.toastService.addError(erro.message)
    );
  }

  atualizarItensGrid() {
    this.empresaService.adquirirTodas().subscribe(
      (empresas) => (this.empresas = empresas),
      (erro) => this.toastService.addError(erro.message)
    );
  }

  salvar() {
    let empresa = this.form.value;

    this.empresaService.salvar(empresa).subscribe(
      () => this.atualizarItensGrid(),
      (erro) => this.toastService.addError(erro.message)
    );

    this.form.reset();
  }

  editar(empresa) {
    let empresaEditando = {
      id: empresa.id,
      nome: empresa.nome,
      cnpj: empresa.cnpj,
      dataAbertura: new Date(empresa.dataAbertura),
      nomeFundador: empresa.nomeFundador,
      codigoCidade: empresa.codigoCidade,
    };

    this.cidadeSelecionada = this.adquirirCidadeSelecionada(
      empresa.codigoCidade
    );

    this.form.setValue(empresaEditando);
  }

  deletar(codigoEmpresa: number) {
    this.empresaService.deletar(codigoEmpresa).subscribe(
      () => {
        this.atualizarItensGrid();
        this.toastService.addSuccess('Registro deletado com sucesso!');
      },
      (erro) => this.toastService.addError(erro.message)
    );
  }

  adquirirCidadeSelecionada(codigoCidade: number) {
    return this.cidades.find((cidade) => cidade.id === codigoCidade);
  }

  adquirirCidadeSede(codigoCidade: number) {
    if (!codigoCidade) {
      return '';
    }

    let cidadeSede = this.cidades.find((cidade) => cidade.id === codigoCidade);

    return cidadeSede.nome + ' - ' + cidadeSede.sigla;
  }
}
