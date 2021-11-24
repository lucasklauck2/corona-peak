import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioInformacaoDTO } from './../../../models/usuarioinformacao.dto';
import { AutenticacaoService } from './../../../service/autenticacao.service';
import { ToastService } from './../../../service/toast-service.service';
import { UsuarioService } from './../../../service/usuario.service';

@Component({
  selector: 'app-detalhe-conta',
  templateUrl: './detalhe-conta.component.html',
  styleUrls: ['./detalhe-conta.component.scss'],
})
export class DetalheContaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private toastService: ToastService
  ) {}

  form: FormGroup;

  usuarioInformacao: UsuarioInformacaoDTO;

  ngOnInit(): void {
    if (!this.autenticacaoService.usuarioJaLogado()) {
      this.router.navigate(['/autenticacao']);
    }

    this.form = this.fb.group({
      nome: [[''], [Validators.minLength(10)]],
      email: [[''], [Validators.email]],
      novaSenha: [[''], [Validators.minLength(8)]],
      senhaAtual: [[''], [Validators.required, Validators.minLength(8)]],
      dataNascimento: [null, [Validators.minLength(10)]],
    });

    this.usuarioService.adquirirDados().subscribe(
      (usuarioInformacao) => {
        this.form.setValue({
          nome: usuarioInformacao.nome,
          email: usuarioInformacao.email,
          novaSenha: '',
          senhaAtual: '',
          dataNascimento: usuarioInformacao.dataNascimento,
        });
      },
      (error) => this.toastService.addError(error.message)
    );
  }
}
