import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CidadeComponent } from './cidade/cidade.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PacienteComponent } from './paciente/paciente.component';
import { SintomaComponent } from './sintoma/sintoma.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    component: CadastroComponent,
  },
  {
    path: 'cidade',
    component: CidadeComponent,
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
  },
  {
    path: 'sintoma',
    component: SintomaComponent,
  },
  {
    path: 'paciente',
    component: PacienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}
