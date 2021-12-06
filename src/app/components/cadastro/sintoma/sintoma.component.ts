import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SintomaDTO } from './../../../models/sintoma.dto';
import { SintomaService } from './../../../service/sintoma.service';
import { ToastService } from '../../../service/toast-service.service';

@Component({
  selector: 'app-sintoma',
  templateUrl: './sintoma.component.html',
  styleUrls: ['./sintoma.component.scss'],
})
export class SintomaComponent implements OnInit {
  form: FormGroup;

  sintomas: Array<SintomaDTO> = [];

  constructor(
    private fb: FormBuilder,
    private sintomaService: SintomaService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.atualizarItensGrid();

    this.form = this.fb.group({
      id: [null],
      nome: [[''], [Validators.minLength(4)]],
    });
  }

  atualizarItensGrid() {
    this.sintomaService.adquirirTodos().subscribe(
      (sintomas) => (this.sintomas = sintomas),
      (erro) => this.toastService.addError(erro.message)
    );
  }

  salvar() {
    this.sintomaService.salvar(this.form.value).subscribe(
      () => this.atualizarItensGrid(),
      (erro) => this.toastService.addError(erro.message)
    );

    this.form.reset();
  }

  editar(sintoma: SintomaDTO) {
    this.form.setValue(sintoma);
  }

  deletar(codigoSintoma: number) {
    this.sintomaService.deletar(codigoSintoma).subscribe(
      () => {
        this.atualizarItensGrid();
        this.toastService.addSuccess('Registro deletado com sucesso!');
      },
      (erro) => this.toastService.addError(erro.message)
    );
  }
}
