import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetalheContaComponent } from './detalhe-conta/detalhe-conta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'informacoes',
  },
  {
    path: 'informacoes',
    component: DetalheContaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export class UsuarioRoutingModule {}
