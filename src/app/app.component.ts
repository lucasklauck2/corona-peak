import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './service/autenticacao.service';
import { PacienteService } from './service/paciente.service';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly MOBILE = 500;

  title = 'app-corona-peak';
  mobile = false;
  tipoAdministrador = false;
  respondeuQuestionario = true;
  estaLogado: boolean;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.pacienteService.respondeuQuestionario.subscribe(
      (respondeu) => (this.respondeuQuestionario = respondeu)
    );

    this.autenticacaoService.estaLogado.subscribe(
      (estaLogado) => (this.estaLogado = estaLogado)
    );

    if (!this.autenticacaoService.usuarioJaLogado()) {
      this.router.navigate(['/autenticacao']);

      this.estaLogado = false;
    } else {
      this.router.navigate(['/']);

      this.estaLogado = true;

      this.autenticacaoService.tipoAdministrador.subscribe(
        (tipoAdministrador) => (this.tipoAdministrador = tipoAdministrador)
      );
    }

    this.mobile = window.innerWidth < this.MOBILE;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = window.innerWidth < this.MOBILE;
  }

  deslogar() {
    this.autenticacaoService.deslogar();
  }
}
