import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CidadeComponent } from './components/cadastro/cidade/cidade.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    DividerModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [HttpClientModule, Storage, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
