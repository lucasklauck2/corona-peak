import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeDTO } from './../../../models/cidade.dto';
import { CidadeService } from './../../../service/cidade.service';
import { ToastService } from './../../../service/toast-service.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss'],
})
export class CidadeComponent implements OnInit {
  form: FormGroup;

  cidades: Array<CidadeDTO> = [];

  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.atualizarItensGrid();

    this.form = this.fb.group({
      id: [null],
      nome: [[''], [Validators.minLength(4)]],
      estado: [[''], [Validators.minLength(4)]],
      sigla: [[''], [Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  atualizarItensGrid() {
    this.cidadeService.adquirirTodas().subscribe(
      (cidades) => (this.cidades = cidades),
      (erro) => this.toastService.addError(erro.message)
    );
  }

  salvar() {
    this.cidadeService.salvar(this.form.value).subscribe(
      () => this.atualizarItensGrid(),
      (erro) => this.toastService.addError(erro.message)
    );

    this.form.reset();
  }

  editar(cidade) {
    this.form.setValue(cidade);
  }

  deletar(codigoCidade: number) {
    this.cidadeService.deletar(codigoCidade).subscribe(
      () => this.atualizarItensGrid(),
      (erro) => this.toastService.addError(erro.message)
    );
  }
}
