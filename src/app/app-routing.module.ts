import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'produtos',
  },
  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./components/autenticacao/autenticacao.module').then(
        (m) => m.AutenticacaoModule
      ),
  },
  {
    path: 'minha-conta',
    loadChildren: () =>
      import('./components/usuario/usuario.module').then(
        (m) => m.UsuarioModule
      ),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./components/cadastro/cadastro.module').then(
        (m) => m.CadastroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
