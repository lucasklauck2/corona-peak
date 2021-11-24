import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from './service/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly MOBILE = 500;

  title = 'app-shop';
  mobile: boolean = false;
  estaLogado: boolean;

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit() {
    this.autenticacaoService.estaLogado.subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });

    if (!this.autenticacaoService.usuarioJaLogado()) {
      this.router.navigate(['/autenticacao']);
      this.estaLogado = false;
    } else {
      this.router.navigate(['/']);
      this.estaLogado = true;
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
