import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from './../../../service/autenticacao.service';
import { UsuarioService } from './../../../service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
