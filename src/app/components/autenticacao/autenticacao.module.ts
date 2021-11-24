import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    MatToolbarModule,
    ToastModule,
    ReactiveFormsModule,
    CalendarModule,
    MatIconModule,
  ],
})
export class AutenticacaoModule {}
