import { switchMap } from 'rxjs/operators';
import { InformacaoPacienteDTO } from 'src/app/models/informacao-paciente.dto';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SintomaDTO } from './../../../models/sintoma.dto';
import { AutenticacaoService } from './../../../service/autenticacao.service';
import { LocalStorageService } from './../../../service/local-storage.service';
import { PacienteService } from './../../../service/paciente.service';
import { SintomaService } from './../../../service/sintoma.service';
import { UsuarioService } from './../../../service/usuario.service';
import { CidadeDTO } from '../../../models/cidade.dto';
import { EmpresaDTO } from '../../../models/empresa.dto';
import { CidadeService } from '../../../service/cidade.service';
import { EmpresaService } from '../../../service/empresa.service';
import { ToastService } from '../../../service/toast-service.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  form: FormGroup;

  empresas: Array<EmpresaDTO> = [];
  cidades: Array<CidadeDTO> = [];
  sintomas: Array<SintomaDTO> = [];
  pacientes: Array<InformacaoPacienteDTO> = [];

  cidadeSelecionada: CidadeDTO;
  empresaSelecionada: EmpresaDTO;
  sintomasSelecionados: Array<number> = [];

  tipoAdministrador = false;

  readonly VERDADEIRO = 'Verdadeiro';
  readonly FALSO = 'Falso';
  readonly SIM = 'SIM';
  readonly NAO = 'NÃO';

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private cidadeService: CidadeService,
    private sintomaService: SintomaService,
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private autenticacaoService: AutenticacaoService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.atualizarItensGrid();

    this.form = this.fb.group({
      id: [null],
      nome: [[''], [Validators.minLength(4)]],
      dataNascimento: [null, [Validators.minLength(10)]],
      peso: [0, [Validators.minLength(3)]],
      altura: [0, [Validators.minLength(3)]],
      codigoCidade: [null, [Validators.required]],
      codigoEmpresa: [null, [Validators.required]],
      flagSuspeito: [false, [Validators.required]],
      flagPositivado: [false, [Validators.required]],
      flagDoencaRespiratoria: [false, [Validators.required]],
      listaSintoma: ['', Validators.nullValidator],
    });

    this.cidadeService.adquirirTodas().subscribe(
      (cidades) => (this.cidades = cidades),
      (erro) => this.toastService.addError(erro.message)
    );

    this.empresaService.adquirirTodas().subscribe(
      (empresas) => (this.empresas = empresas),
      (erro) => this.toastService.addError(erro.message)
    );

    this.sintomaService.adquirirTodos().subscribe(
      (sintomas) => (this.sintomas = sintomas),
      (erro) => this.toastService.addError(erro.message)
    );

    this.usuarioService
      .adquirirTipoUsuario()
      .subscribe((tipoUsuario) =>
        this.autenticacaoService.emitirMensagemTipoAdministrador(
          tipoUsuario === 1 ? true : false
        )
      );

    this.autenticacaoService.tipoAdministrador.subscribe(
      (tipoAdministrador) => (this.tipoAdministrador = tipoAdministrador)
    );

    this.atualizarItensGrid();
  }

  atualizarItensGrid() {
    this.pacienteService.adquirirTodos().subscribe(
      (pacientes) => (this.pacientes = pacientes),
      (erro) => this.toastService.addError(erro.message)
    );
  }

  salvar() {
    let paciente = this.form.value;

    let informacaoPaciente: InformacaoPacienteDTO = paciente;

    this.usuarioService
      .adquirirTipoUsuario()
      .pipe(
        switchMap((tipoUsuario) => {
          if (tipoUsuario === 0) {
            informacaoPaciente.codigoUsuario = Number(
              this.localStorageService.get('codigoUsuario')
            );

            this.pacienteService.emitirRespondeuQuestionario(true);

            this.router.navigate(['/']);
          }

          return this.pacienteService.salvar(paciente);
        })
      )
      .subscribe(
        () => {
          this.atualizarItensGrid();
          this.toastService.addSuccess('Paciente salvo!');
        },
        (erro) => this.toastService.addError(erro.message)
      );

    this.form.reset();

    this.atualizarItensGrid();
  }

  editar(paciente: InformacaoPacienteDTO) {
    console.log(this.form);

    let pacienteEditando = {
      id: paciente.id,
      nome: paciente.nome,
      dataNascimento: new Date(paciente.dataNascimento),
      peso: paciente.peso,
      altura: paciente.altura,
      codigoCidade: paciente.codigoCidade,
      codigoEmpresa: paciente.codigoEmpresa,
      flagSuspeito: paciente.flagSuspeito,
      flagPositivado: paciente.flagPositivado,
      flagDoencaRespiratoria: paciente.flagDoencaRespiratoria,
      listaSintoma: paciente.listaSintoma,
    };

    this.cidadeSelecionada = this.adquirirCidadeSelecionada(
      paciente.codigoCidade
    );

    this.empresaSelecionada = this.adquirirEmpresaSelecionada(
      paciente.codigoEmpresa
    );

    this.form.setValue(pacienteEditando);

    this.form.controls.listaSintoma.patchValue(paciente.listaSintoma);

    this.sintomasSelecionados = paciente.listaSintoma;
  }

  deletar(codigoPaciente: number) {
    this.pacienteService.deletar(codigoPaciente).subscribe(
      () => {
        this.atualizarItensGrid();
        this.toastService.addSuccess('Registro deletado com sucesso!');
      },
      (erro) => this.toastService.addError(erro.message)
    );
  }

  adquirirCidadeSelecionada(codigoCidade: number) {
    return this.cidades.find((cidade) => cidade.id === codigoCidade);
  }

  adquirirEmpresaSelecionada(codigoEmpresa: number) {
    return this.empresas.find((empresa) => empresa.id === codigoEmpresa);
  }

  adquirirCidadePaciente(codigoCidade: number) {
    let cidadePaciente = this.cidades.find(
      (cidade) => cidade.id === codigoCidade
    );

    return cidadePaciente.nome + ' - ' + cidadePaciente.sigla;
  }

  adquirirEmpresaPaciente(codigoEmpresa: number) {
    return this.empresas.find((empresa) => empresa.id === codigoEmpresa).nome;
  }

  adquirirSimNao(flag: boolean) {
    if (!flag) {
      return this.NAO;
    }

    return this.SIM;
  }

  get listaSintoma(): Array<FormControl> {
    return (this.form.get('listaSintoma') as FormArray)
      .controls as Array<FormControl>;
  }
}
