import { RegistroDTO } from 'src/app/models/registro.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from './../../../service/autenticacao.service';
import { PacienteService } from './../../../service/paciente.service';
import { ToastService } from './../../../service/toast-service.service';
import { UsuarioService } from './../../../service/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      dataNascimento: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  registrar() {
    this.autenticacaoService
      .registrar(
        new RegistroDTO(
          this.form.get('nome').value,
          this.form.get('email').value,
          this.form.get('senha').value,
          this.form.get('dataNascimento').value
        )
      )
      .subscribe(
        (retornoRegistroDTO) => {
          this.autenticacaoService.realizarLogin(retornoRegistroDTO);

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
