import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadeComponent } from './cidade/cidade.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cidade',
  },
  {
    path: 'cidade',
    component: CidadeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}
