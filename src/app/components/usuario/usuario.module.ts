import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetalheContaComponent } from './detalhe-conta/detalhe-conta.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [DetalheContaComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CalendarModule,
    PasswordModule,
    InputTextModule,
  ],
})
export class UsuarioModule {}
