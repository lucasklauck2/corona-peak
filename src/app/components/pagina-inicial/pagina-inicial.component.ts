import { Component, OnInit } from '@angular/core';
import { DadosRelatorioDTO } from './../../models/dados-relatoriodto';
import { RelatorioService } from './../../service/relatorio.service';
import { ToastService } from './../../service/toast-service.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss'],
})
export class PaginaInicialComponent implements OnInit {
  dadosRelatorio = new DadosRelatorioDTO();

  constructor(
    private relatorioService: RelatorioService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.relatorioService.adquirirTodos().subscribe(
      (dadosRelatorio) => (this.dadosRelatorio = dadosRelatorio),
      () => this.toastService.addError('Erro ao adquirir relatórios!')
    );
  }
}
