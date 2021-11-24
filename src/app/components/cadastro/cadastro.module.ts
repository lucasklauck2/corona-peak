import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CidadeComponent } from './cidade/cidade.component';

@NgModule({
  declarations: [CidadeComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class CadastroModule {}
