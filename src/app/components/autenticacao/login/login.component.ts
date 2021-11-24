import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from './../../../models/login.dto';
import { AutenticacaoService } from './../../../service/autenticacao.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  valido = true;

  form: FormGroup;

  constructor(
    private autenticacaoService: AutenticacaoService,
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
    this.autenticacaoService.entrar(
      new LoginDTO(this.form.get('email').value, this.form.get('senha').value)
    );
  }
}
