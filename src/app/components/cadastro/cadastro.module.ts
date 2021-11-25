import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
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
    TableModule,
    MatIconModule,
  ],
})
export class CadastroModule {}
