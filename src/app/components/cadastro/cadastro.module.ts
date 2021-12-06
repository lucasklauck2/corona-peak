import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CidadeComponent } from './cidade/cidade.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PacienteComponent } from './paciente/paciente.component';
import { SintomaComponent } from './sintoma/sintoma.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    CidadeComponent,
    EmpresaComponent,
    SintomaComponent,
    PacienteComponent,
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    MatIconModule,
    CalendarModule,
    DropdownModule,
    SliderModule,
    InputNumberModule,
    ToggleButtonModule,
    MultiSelectModule,
  ],
})
export class CadastroModule {}
