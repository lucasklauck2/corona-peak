import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from './../../../models/login.dto';
import { AutenticacaoService } from './../../../service/autenticacao.service';
import { PacienteService } from './../../../service/paciente.service';
import { ToastService } from './../../../service/toast-service.service';
import { UsuarioService } from './../../../service/usuario.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  valido = true;

  form: FormGroup;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.autenticacaoService.usuarioJaLogado()) {
      this.router.navigate(['/']);
    }

    this.form = this.fb.group({
      email: ['', [Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  realizarLogin() {
    this.autenticacaoService
      .entrar(
        new LoginDTO(this.form.get('email').value, this.form.get('senha').value)
      )
      .subscribe(
        (retornoLoginDTO) => {
          this.autenticacaoService.realizarLogin(retornoLoginDTO);

          this.usuarioService
            .adquirirTipoUsuario()
            .subscribe((codigoTipoUsuario) => {
              let tipoAdministrador = codigoTipoUsuario === 1 ? true : false;

              this.autenticacaoService.emitirMensagemTipoAdministrador(
                tipoAdministrador
              );

              if (!tipoAdministrador) {
                this.pacienteService
                  .verificarRespostaQuestionario()
                  .subscribe((respondeuQuestionario) =>
                    this.pacienteService.emitirRespondeuQuestionario(
                      respondeuQuestionario
                    )
                  );
              } else {
                this.pacienteService.emitirRespondeuQuestionario(true);
              }
            });
        },
        (erro) => {
          this.toastService.addError(erro.error.message);
        }
      );
  }
}
